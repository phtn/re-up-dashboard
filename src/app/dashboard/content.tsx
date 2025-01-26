"use client";

import type { ReactNode } from "react";
import { BChart, CardStat, MetricStat } from "@/components/stats/line";
import SampleTable from "@/components/ui/table/index";
import "./style.css";
import { ActionButton } from "./components";

interface ContentProps {
  children?: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <main className="relative flex h-[calc(90vh)] overflow-y-scroll">
      <section className="flex w-full flex-1 flex-col gap-4 pt-0">
        <div className="grid h-fit md:gap-4 gap-y-2 grid-cols-1 w-full md:grid-cols-4 px-2 md:px-4">
          <CardStat />
          <BChart />
          <div className="col-span-1 md:col-span-2 rounded-xl bg-muted/50">
            <MetricStat />
          </div>
        </div>

        <div className="px-4">
          <div className="h-fit rounded-lg overflow-hidden border border-foreground/40 w-full md:min-h-min">
            <SampleTable />
          </div>

          <div className="h-24"></div>
        </div>
        <div className="hidden h-fit w-full">{children}</div>
      </section>
      <ActionButton />
    </main>
  );
};
