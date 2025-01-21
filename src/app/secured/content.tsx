import { CreateProject } from "@/components/app/create-project";
import { AppSidebar } from "@/components/app/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UpcomingEvents } from "./components";
import type { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
}
export const Content = ({ children }: ContentProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex">
          <section className="h-full flex flex-1 flex-col gap-4 pt-0 px-4">
            <div className="grid auto-rows-min h-full gap-4 md:grid-cols-3">
              <div className="aspect-square h-full rounded-xl bg-muted/50" />
              <div className="aspect-square rounded-xl bg-muted/50" />
              <div className="aspect-square rounded-xl bg-muted/50 h-full overflow-hidden">
                {children}
              </div>
            </div>
            <div className="min-h-[100vh] flex justify-between p-4 bg-muted/50 w-full md:min-h-min">
              <UpcomingEvents />
              {children}
            </div>
          </section>
          <div>
            <CreateProject />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
