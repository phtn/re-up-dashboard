import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import { Toasts } from "./toast";
import { AuthCtxProvider } from "./auth";
import { SidebarCtxProvider } from "./sidebar";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthCtxProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <SidebarCtxProvider>{children}</SidebarCtxProvider>
        <Toasts />
      </ThemeProvider>
    </AuthCtxProvider>
  );
};
