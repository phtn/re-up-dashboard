"use client";

import { ThemeProvider } from "@/components/theme-provider";
import type { ReactNode } from "react";
import { Toasts } from "./toast";
import { AuthCtxProvider } from "./auth";
import { ConvexCtxProvider } from "./convex";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableColorScheme
      enableSystem
    >
      <ConvexCtxProvider>
        <AuthCtxProvider>{children}</AuthCtxProvider>
      </ConvexCtxProvider>
      <Toasts />
    </ThemeProvider>
  );
};
