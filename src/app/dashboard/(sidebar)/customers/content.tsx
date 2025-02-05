"use client";
import { CustomersTable } from "@/components/ui/table/customers";
import { ActionButton, Counter } from "../../components";
import { useCustomers } from "../../_hooks_/useCustomers";
import { cx_cols } from "@/components/ui/table/customers";
import { opts } from "@/utils/helpers";
import { useCallback } from "react";

export const Content = () => {
  const { addCx, cx } = useCustomers();

  const TableViewer = useCallback(() => {
    const options = opts(
      <CustomersTable data={cx!} columns={cx_cols} />,
      <div className="h-24 flex items-center justify-center">Loading</div>,
    );
    return <>{options.get(!!cx)}</>;
  }, [cx]);

  return (
    <main className="w-full scroll-smooth h-[calc(90vh)] overflow-y-scroll">
      <div className="px-4">
        <div className="h-full rounded-lg overflow-hidden border border-gray-400/60 w-full md:min-h-min">
          <TableViewer />
        </div>
        <div className="h-24"></div>
      </div>

      <div className=" fixed right-8 bottom-8 z-50 flex items-end gap-2">
        <Counter count={cx?.length} />
        <ActionButton fn={addCx} />
      </div>
    </main>
  );
};
