"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { SelectCustomer } from "@/vx/customers/d";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type {
  Cell,
  CellContext,
  ColumnDef,
  Header,
  SortingState,
} from "@tanstack/react-table";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import {
  type CSSProperties,
  type ReactElement,
  useEffect,
  useId,
  useState,
} from "react";

interface CellProps<T, D> {
  prop: D;
  ctx?: CellContext<T, unknown>;
}

const numberCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => (
  <div className="flex h-full items-center">
    <p
      className={cn(
        "font-inter text-sm font-bold tracking-tight text-foreground/30",
      )}
    >
      {ctx?.row.getValue(prop)}
    </p>
  </div>
);

const titleCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => (
  <div className="flex h-full">
    <p
      className={cn(
        "font-inter text-sm font-bold tracking-tight text-foreground/30",
      )}
    >
      {ctx?.row.getValue(prop)}
    </p>
  </div>
);

const cellValue =
  <T, D extends string>(prop: D) =>
  (ctx: CellContext<T, unknown>) =>
    numberCell<T, D>({ prop, ctx });

const cellTitle =
  <T, D extends string>(prop: D) =>
  (ctx: CellContext<T, unknown>) =>
    titleCell<T, D>({ prop, ctx });

interface ICreateColumn<T> {
  id?: keyof T;
  accessor: keyof T;
  header: string;
  cell?: (ctx: CellContext<T, unknown>) => ReactElement;
  sortUndefined?: false | 1 | -1 | "last" | "first";
  sortDescFirst?: boolean;
}

const createColumn = <T,>({
  cell,
  accessor,
  sortUndefined = "last",
  sortDescFirst = false,
  ...rest
}: ICreateColumn<T>) =>
  createColumnHelper().accessor(accessor as string, {
    ...rest,
    id: accessor as string,
    cell: () => cell,
    sortDescFirst,
    sortUndefined,
  }) as ColumnDef<T>;

const customer_id = createColumn<SelectCustomer>({
  accessor: "customer_id",
  header: "Id",
  cell: cellValue("customer_id"),
});
const username = createColumn<SelectCustomer>({
  accessor: "username",
  header: "Username",
  cell: cellTitle("username"),
});

const columns = [customer_id, username];

export default function CustomerTable() {
  const [data, setData] = useState<SelectCustomer[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pending, setPending] = useState(false);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

  useEffect(() => {
    async function fetchPosts() {
      setPending(true);
      const res = await fetch(
        "https://res.cloudinary.com/dlzlfasou/raw/upload/users-01_fertyx.json",
      );
      const data = await res.json();
      setData(data.slice(0, 10)); // Limit to 5 items
      setPending(false);
    }
    fetchPosts().catch(console.error);
    setPending(false);
  }, []);

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    enableSortingRemoval: false,
  });

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      id={useId()}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Table>
        <TableHeader className="[&_tr]:border-transparent sticky font-medium text-xs font-sans">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-slate-100 w-full border-0"
            >
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <DraggableTableHeader key={header.id} header={header} />
                ))}
              </SortableContext>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-12 border-0 hover:bg-stone-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <SortableContext
                    key={cell.id}
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    <DragAlongCell key={cell.id} cell={cell} />
                  </SortableContext>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-32 text-center">
                {pending ? `Loading...` : `No results.`}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <p className="mt-4 text-center text-sm">{pending ? `loading` : ``}</p>
    </DndContext>
  );
}

const DraggableTableHeader = ({
  header,
}: {
  header: Header<SelectCustomer, unknown>;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: header.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableHead
      ref={setNodeRef}
      className="relative h-10 border-0 before:absolute before:inset-y-0 before:start-0 before:w-px before:bg-border first:before:bg-transparent"
      style={style}
      aria-sort={
        header.column.getIsSorted() === "asc"
          ? "ascending"
          : header.column.getIsSorted() === "desc"
            ? "descending"
            : "none"
      }
    >
      <div className="flex items-center justify-start gap-0.5">
        <Button
          size="icon"
          variant="ghost"
          className="-ml-2 size-7 shadow-none cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical
            className="opacity-20"
            size={12}
            strokeWidth={2}
            aria-hidden="true"
          />
        </Button>
        <span className="grow truncate">
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </span>
        <Button
          size="icon"
          variant="ghost"
          className="group -mr-1 size-7 shadow-none"
          onClick={header.column.getToggleSortingHandler()}
          onKeyDown={(e) => {
            // Enhanced keyboard handling for sorting
            if (
              header.column.getCanSort() &&
              (e.key === "Enter" || e.key === " ")
            ) {
              e.preventDefault();
              header.column.getToggleSortingHandler()?.(e);
            }
          }}
        >
          {{
            asc: (
              <ChevronUp
                className="shrink-0 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            ),
            desc: (
              <ChevronDown
                className="shrink-0 opacity-60"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
            ),
          }[header.column.getIsSorted() as string] ?? (
            <ChevronUp
              className="shrink-0 opacity-0 group-hover:opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </TableHead>
  );
};

const DragAlongCell = ({ cell }: { cell: Cell<SelectCustomer, unknown> }) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition,
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <TableCell ref={setNodeRef} className="truncate" style={style}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};
