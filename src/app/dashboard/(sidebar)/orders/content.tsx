"use client";

import { usePathname } from "next/navigation";

export const Content = () => {
  const pathname = usePathname();
  const nav = pathname.split("/")[2];
  return (
    <main>
      {pathname} | {nav}
    </main>
  );
};
