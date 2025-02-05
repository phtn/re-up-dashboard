import type { SelectSale } from "@/vx/sales/d";
import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Id } from "@/vx/_generated/dataModel";
import { createColumn } from "./column";
import { useCallback, useId, useState } from "react";
import { DataTableProps } from ".";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../table";
import { DraggableTableHeader, DragAlongCell } from "./components";
import { Options } from "./options";
import { Icon } from "../icons";

export interface ConvexInternal {
  _id?: Id<"sales">;
  _creationTime?: number;
}
export const sx_cols: ColumnDef<SelectSale & ConvexInternal>[] = [
  createColumn({
    accessor: "sale_id",
    header: "ID",
    cellType: "id",
  }),
  createColumn({
    accessor: "photo_url",
    header: "Photo",
    cellType: "photo",
    width: "w-fit",
  }),
  createColumn({
    accessor: "item_name",
    header: "Item Name",
    cellType: "name",
    width: "w-fit",
  }),
  createColumn({
    accessor: "item_brand",
    header: "Brand",
    cellType: "text",
  }),
  createColumn({
    accessor: "amount",
    header: "amount",
    cellType: "money",
  }),
  createColumn({
    accessor: "customer_name",
    header: "Customer",
    cellType: "name",
  }),
  createColumn({
    accessor: "status",
    header: "status",
    cellType: "status",
    width: "w-20",
  }),
  createColumn({
    accessor: "_id",
    header: "internal",
    cellType: "internal",
    width: "w-fit",
  }),
];

export const SalesTable = ({ columns, data }: DataTableProps<SelectSale>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((column) => column.id as string),
  );

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
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }, []);

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
              className="capitalize bg-gray-400/10 text-foreground/60 font-medium w-full border-0"
            >
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <DraggableTableHeader key={header.id} header={header} />
                ))}
              </SortableContext>
              <TableCell className="flex items-center justify-end pe-4 h-10">
                options
              </TableCell>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="h-16 border-b-[0.33px] border-gray-400/40 hover:bg-gray-500/5"
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
                <TableCell className="flex items-center h-16 pe-4 justify-end">
                  <Options id={row.getValue("_id")} table={"sales"}>
                    <button className="cursor-pointer w-fit hover:bg-gray-300/40 rounded-full">
                      <Icon name="MoreHori" className="size-5 opacity-60" />
                    </button>
                  </Options>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-32 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DndContext>
  );
};
