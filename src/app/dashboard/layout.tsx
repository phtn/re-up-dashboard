import { NewSidebar } from "@/components/app/sidebar";
import type { ReactNode } from "react";
import { Header } from "./components";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex">
      <NewSidebar />
      <div className="w-full h-screen">
        <Header />
        {children}
      </div>
    </div>
  );
};
export default DashboardLayout;
