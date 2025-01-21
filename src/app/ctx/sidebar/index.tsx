"use client";

import { useToggle } from "@/hooks/use-toggle";
import { createContext, useMemo, type ReactNode } from "react";

interface CtxValues {
  open: boolean;
  toggle: VoidFunction;
}
export const SidebarCtx = createContext<CtxValues | null>(null);

export const SidebarCtxProvider = ({ children }: { children: ReactNode }) => {
  const { open, toggle } = useToggle();

  const value = useMemo(
    () => ({
      open,
      toggle,
    }),
    [open, toggle],
  );
  return <SidebarCtx value={value}>{children}</SidebarCtx>;
};
