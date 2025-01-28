"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactNode, use, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "../icons";
import { HyperList } from "../list";
import { Id, TableNames } from "@/vx/_generated/dataModel";
import { ConvexCtx } from "@/app/ctx/convex";
import { onSuccess } from "@/app/ctx/toast";
import { Err } from "@/utils/helpers";

interface OptionProps {
  children: ReactNode;
  id: Id<TableNames>;
  table: "customers" | "sales";
}

export function Options({ children, id, table }: OptionProps) {
  const { customers, sales } = use(ConvexCtx)!;

  const deleteItem = useCallback(async () => {
    switch (table) {
      case "customers":
        return await customers
          .delete(id as Id<"customers">)
          .then(() => {
            onSuccess("1 item deleted.");
          })
          .catch(Err);
      case "sales":
        return await sales
          .delete(id as Id<"sales">)
          .then(() => {
            onSuccess("1 item deleted.");
          })
          .catch(Err);
      default:
        return;
    }
  }, [id, customers, sales, table]);

  const options: Option[] = useMemo(
    () => [
      {
        id: 0,
        label: "delete",
        icon: "XMark",
        fn: deleteItem,
        is_active: true,
      },
    ],
    [deleteItem],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-20 rounded-xl border border-gray-600 dark:bg-gray-300"
        align="end"
        side="left"
        sideOffset={10}
        alignOffset={-8}
      >
        <DropdownMenuGroup>
          <HyperList
            data={options}
            component={OptionItem}
            keyId="id"
            container="space-y-0.5"
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const OptionItem = (option: Option) => (
  <DropdownMenuItem
    key={option.id}
    className={cn(
      "px-3 py-2 justify-between cursor-pointer capitalize rounded-lg bg-gray-950 hover:bg-gray-800/90",
      {
        "bg-gray-800": option.is_active,
      },
    )}
    onClick={option.fn}
  >
    <p className="font-medium text-xs tracking-tight text-white">
      {option.label}
    </p>
    <Icon name={option.icon} className="size-5 text-red-400" />
  </DropdownMenuItem>
);

interface Option {
  id: number;
  label: string;
  icon: IconName;
  fn: VoidFunction;
  is_active: boolean;
}
