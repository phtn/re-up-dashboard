import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/helpers";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { CellContext } from "@tanstack/react-table";
import moment from "moment";
import { type JSX } from "react";
import { Icon } from "../icons";
import { Options } from "./options";
import { Id, TableNames } from "@/vx/_generated/dataModel";

export type CellType =
  | "id"
  | "text"
  | "date"
  | "money"
  | "person"
  | "status"
  | "photo"
  | "name"
  | "bool"
  | "option"
  | "internal";

interface CellProps<T, D> {
  prop: D;
  ctx: CellContext<T, unknown>;
}
export const idCell = <T, D extends string>({ prop, ctx }: CellProps<T, D>) => {
  const id = ctx?.row.getValue(prop) as string;
  return <p className="text-xs">{id.split("-")[0]}</p>;
};

export const numberCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex h-full items-start">
    <p className={cn("text-sm font-bold tracking-tight text-foreground/30")}>
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
}: CellProps<T, D>) => {
  const isHidden = prop === "_id";
  return (
    <div className={cn("flex h-full ps-4 items-start", { "": isHidden })}>
      <p className={cn("text-xs")}>{ctx.row.getValue(prop)}</p>
    </div>
  );
};

export const photoCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex h-full w-16 ps-4 justify-center items-start">
    <Avatar className="border border-foreground/40 size-9">
      <AvatarImage alt="avatar" src={ctx.row.getValue(prop)} />
      <AvatarFallback className="text-sm font-bold">
        {getInitials(ctx.row.getValue(prop))}
      </AvatarFallback>
    </Avatar>
  </div>
);

export const nameCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => (
  <div className="flex h-full ps-5 justify-start w-full items-start">
    <p className={cn("text-sm max-w-[35ch] font-medium")}>
      {ctx.row.getValue(prop)}
    </p>
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

export const boolCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => {
  const isTrue = ctx.row.getValue(prop) as boolean;
  return (
    <div className="flex w-24 items-start justify-center h-full">
      <p
        className={cn(
          "text-xs tracking-tight text-amber-400/80 capitalize rounded-full py-1 px-2 border ",
          { "text-blue-400": isTrue },
        )}
      >
        ● {isTrue ? "active" : "inactive"}
      </p>
    </div>
  );
};

export const optionCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => {
  const _id = ctx.row.getValue(prop) as Id<TableNames>;
  return (
    <div className="flex w-fit h-full items-center">
      <Options id={_id} table={"sales"}>
        <button className="cursor-pointer w-fit hover:bg-gray-300/40 rounded-full">
          <Icon name="MoreHori" className="size-5 opacity-60" />
        </button>
      </Options>
    </div>
  );
};
export const internalCell = <T, D extends string>({
  prop,
  ctx,
}: CellProps<T, D>) => {
  const trunc = ctx.row.getValue(prop) as string;
  return (
    <div className={cn("flex h-full ps-6 w-fit items-start")}>
      <p className={cn("text-xs font-mono")}>{trunc.substring(0, 8)}</p>
    </div>
  );
};
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
    case "id":
      return renderCell(cell, idCell);
    case "name":
      return renderCell(cell, nameCell);
    case "photo":
      return renderCell(cell, photoCell);
    case "person":
      return renderCell(cell, personCell);
    case "money":
      return renderCell(cell, moneyCell);
    case "date":
      return renderCell(cell, dateCell);
    case "status":
      return renderCell(cell, statusCell);
    case "bool":
      return renderCell(cell, boolCell);
    case "option":
      return renderCell(cell, optionCell);
    case "internal":
      return renderCell(cell, internalCell);
    default:
      return renderCell(cell, textCell);
  }
};
