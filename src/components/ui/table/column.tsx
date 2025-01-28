import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { type CellType, getCell } from "./cell";
import { renderHeader } from "./header";

interface ICreateColumn<T> {
  id?: keyof T;
  accessor: keyof T;
  header?: string;
  cell?: string;
  sortUndefined?: false | 1 | -1 | "last" | "first";
  sortDescFirst?: boolean;
  cellType?: CellType;
  width?: string;
}

export const createColumn = <T,>(props: ICreateColumn<T>) =>
  createColumnHelper().accessor(props.accessor as string, {
    ...props,
    id: props.accessor as string,
    header: renderHeader({
      header: props.header ?? (props.accessor as string),
      width: props.width,
    }),
    cell: getCell(
      props.cellType ?? "text",
      props.cell ?? (props.accessor as string),
    ),
    enableHiding: true,
    meta: {
      filterVarian: "select",
    },
    filterFn: (row, filterValue) => {
      const val = row.getValue("_id");
      return Array.isArray(val) && !val.includes(filterValue);
    },
  }) as ColumnDef<T>;
