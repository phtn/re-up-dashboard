"use client";

import { useCallback, type ReactNode } from "react";
import { BChart, CardStat, MetricStat } from "@/components/stats/line";
import { useSales } from "./_hooks_/useSales";
import { SalesTable } from "@/components/ui/table/sales";
import { sx_cols } from "@/components/ui/table/sales";
import { opts } from "@/utils/helpers";
import "./style.css";

import { ActionButton, Counter } from "./components";

interface ContentProps {
  children?: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  const { addSx, sx } = useSales();

  const TableViewer = useCallback(() => {
    const options = opts(
      <SalesTable data={sx!} columns={sx_cols} />,
      <div className="h-24 flex items-center justify-center">Loading</div>,
    );
    return <>{options.get(!!sx)}</>;
  }, [sx]);

  return (
    <main className="relative flex h-[calc(90vh)] overflow-y-scroll">
      <section className="flex w-full flex-1 flex-col gap-4 pt-0">
        <div className="grid h-fit md:gap-4 gap-y-2 grid-cols-1 w-full md:grid-cols-4 px-2 md:px-4">
          <CardStat sx={sx} />
          <BChart />
          <div className="col-span-1 md:col-span-2 rounded-xl bg-muted/50">
            <MetricStat />
          </div>
        </div>

        <div className="px-4">
          <div className="h-fit rounded-lg overflow-hidden border border-gray-400/40 w-full md:min-h-min">
            <TableViewer />
          </div>

          <div className="h-24"></div>
        </div>
        <div className="hidden h-fit w-full">{children}</div>
      </section>
      <div className="fixed right-8 bottom-8 z-50 flex items-end gap-2">
        <Counter count={sx?.length} />
        <ActionButton fn={addSx} />
      </div>
    </main>
  );
};
