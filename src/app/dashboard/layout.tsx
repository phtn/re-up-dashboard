"use client";

import { NewSidebar, ProjectSwitcher } from "@/components/app/sidebar";
import type { ReactNode } from "react";
import { Header } from "./components";
import { useIsMobile } from "@/hooks/use-mobile";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  return (
    <div className="flex">
      {isMobile ? null : <NewSidebar />}
      <div className="w-full h-screen">
        <Header>{isMobile ? <ProjectSwitcher /> : null}</Header>
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
