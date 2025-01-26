import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/helpers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { CellContext } from "@tanstack/react-table";
import moment from "moment";
import { type JSX } from "react";

export type CellType = "text" | "date" | "money" | "person" | "status";

interface CellProps<T, D> {
  prop: D;
  ctx: CellContext<T, unknown>;
}

export const numberCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex h-full items-start">
    <p
      className={cn(
        "font-inter text-sm font-bold tracking-tight text-foreground/30",
      )}
    >
      {ctx?.row.getValue(prop)}
    </p>
  </div>
);

export const moneyCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => {
  const amount = parseFloat(ctx?.row.getValue(prop));
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    compactDisplay: "short",
  }).format(amount);
  return <div className="flex justify-end font-medium w-20">{formatted}</div>;
};

export const personCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex gap-2 h-full">
    <Avatar className="border border-foreground/40 size-8">
      <AvatarImage alt="avatar" src={ctx.row.getValue(prop)} />
      <AvatarFallback className="text-sm font-bold">
        {getInitials(ctx.row.getValue(prop))}
      </AvatarFallback>
    </Avatar>
    <div className=" space-y-0.5">
      <p className={cn("text-xs font-medium")}>{ctx.row.getValue(prop)}</p>
      <p className={cn("text-xs opacity-60")}>{ctx.row.getValue("email")}</p>
    </div>
  </div>
);

export const dateCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="gap-2 h-full space-y-0.5 w-fit">
    {/* <p className={cn("text-xs font-medium")}>{ctx.row.getValue(prop)}</p> */}
    <div className={cn("text-xs font-medium", prop, ctx.row.getValue(prop))}>
      {moment(Date.now()).format("lll")}
    </div>
    <p className={cn("text-xs text-right opacity-60")}>{moment().fromNow()}</p>
  </div>
);

export const textCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex h-full items-start">
    <p className={cn("text-xs")}>{ctx.row.getValue(prop)}</p>
  </div>
);

export const statusCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex w-24 items-start justify-center h-full">
    <p
      className={cn(
        "text-xs font-semibold rounded-lg py-1 px-2 bg-gray-400/20",
      )}
    >
      {ctx.row.getValue(prop)}
    </p>
  </div>
);

export const renderCell =
  <T, D extends string>(
    prop: D,
    renderFn: (params: {
      prop: D;
      ctx: CellContext<T, unknown>;
    }) => JSX.Element,
  ) =>
  (ctx: CellContext<T, unknown>) =>
    renderFn({ prop, ctx });

export const getCell = (type: CellType, cell: string) => {
  switch (type) {
    case "person":
      return renderCell(cell, personCell);
    case "money":
      return renderCell(cell, moneyCell);
    case "date":
      return renderCell(cell, dateCell);
    case "status":
      return renderCell(cell, statusCell);
    default:
      return renderCell(cell, textCell);
  }
};
