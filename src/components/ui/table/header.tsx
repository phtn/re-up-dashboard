import { cn } from "@/lib/utils";
import { Column, HeaderContext } from "@tanstack/react-table";
import type { HTMLAttributes, JSX } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  header?: string;
}

type HeaderData = { header: string; width?: string };

interface HeaderProps<T, D extends HeaderData> {
  prop: D;
  ctx: HeaderContext<T, unknown>;
}

function ColumnHeader<TData, TValue>({
  className,
  header,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isHidden = header === "hidden";
  return isHidden ? null : (
    <div
      className={cn(
        "font-bold text-slate-600/80 dark:text-gray-500",
        className,
      )}
    >
      {header}
    </div>
  );
}

const renderFn = <T, D extends HeaderData>({
  prop,
  ctx,
}: HeaderProps<T, D>) => (
  <ColumnHeader
    column={ctx.column}
    header={prop.header}
    className={prop.width}
  />
);

const header =
  <T, D extends HeaderData>(
    prop: D,
    renderFn: ({ prop, ctx }: HeaderProps<T, D>) => JSX.Element,
  ) =>
  (ctx: HeaderContext<T, unknown>) =>
    renderFn({ prop, ctx });

export const renderHeader = (prop: HeaderData) => header(prop, renderFn);
