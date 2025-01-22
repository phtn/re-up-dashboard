"use client";

import type { ReactNode } from "react";
import { BChart, CardStat, MetricStat } from "@/components/stats/line";
import "./style.css";
import SampleTable from "@/components/ui/table/index";

interface ContentProps {
  children?: ReactNode;
}

export const Content = ({ children }: ContentProps) => {
  return (
    <main className="flex h-[calc(90vh)] border-b overflow-y-scroll">
      <section className="flex flex-1 flex-col gap-4 pt-0">
        <div className="grid auto-rows-min h-fit gap-4 md:grid-cols-4 px-4">
          <CardStat />
          <BChart />
          <div className="dark:bg-white col-span-2 rounded-xl bg-muted/50">
            <MetricStat />
          </div>
        </div>

        <div className="px-4">
          <div className="h-fit rounded-lg overflow-hidden border border-gray-400 w-full md:min-h-min">
            <SampleTable />
          </div>

          <div className="h-24"></div>
        </div>
        <div className="hidden h-fit w-full">{children}</div>
      </section>
    </main>
  );
};
