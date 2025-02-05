import { CreateProject } from "@/components/app/create-project";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import type { ReactNode } from "react";
import { BChart, MetricStat } from "@/components/stats/line";
import { NewSidebar } from "@/components/app/sidebar";
import "./style.css";

interface ContentProps {
  children?: ReactNode;
}
export const Content = ({ children }: ContentProps) => {
  return (
    <div className="flex">
      <NewSidebar />
      <div className="w-full">
        <header className="flex h-16 shrink-0 items-center py-1.5 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center px-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  Sales
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex">
          <section className="flex flex-1 flex-col gap-4 pt-0">
            <div className="grid auto-rows-min h-fit gap-4 md:grid-cols-4 px-4">
              <BChart />
              <div className="dark:bg-white col-span-2 rounded-xl bg-muted/50">
                <MetricStat />
              </div>
            </div>
            <div className="hidden h-fit w-full md:min-h-min">{children}</div>
          </section>
          <div>
            <CreateProject />
          </div>
        </main>
      </div>
    </div>
  );
};
