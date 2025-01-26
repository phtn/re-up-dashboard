"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Mode } from "@/app/types";
import { type ComponentProps, useEffect, useState } from "react";
import { getTheme } from "@/app/actions";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  const [theme, setTheme] = useState<Mode>();

  useEffect(() => {
    getTheme().then(setTheme).catch(console.error);
  }, []);

  return (
    <NextThemesProvider {...props}>
      <div className={`${theme ?? `dark`}`}>{children}</div>
    </NextThemesProvider>
  );
}
