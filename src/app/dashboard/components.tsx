"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavUser } from "@/components/app/nav-user";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons";

export const Header = ({ children }: { children?: ReactNode }) => {
  const pathname = usePathname();
  const nav = pathname.split("/")[2];
  const isMobile = useIsMobile();
  return (
    <header className="flex h-16 shrink-0 items-center py-1.5 ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-end justify-between md:px-4 px-2">
        <section className="flex gap-0 items-center">
          {children}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  className="font-bold capitalize text-lg md:text-2xl"
                >
                  {nav ?? `sales`}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        {isMobile ? (
          <NavUser />
        ) : (
          <Button
            size={"sm"}
            variant={"ghost"}
            className="bg-gray-200 dark:bg-gray-500/20 active:scale-95 transition-all duration-300"
          >
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};

interface ActionProps {
  fn: VoidFunction;
  label?: string;
}
export const ActionButton = ({ fn }: ActionProps) => {
  return (
    <button
      onClick={fn}
      className={cn(
        "size-12 flex items-center justify-center rounded-full",
        "text-sm bg-amber-300 cursor-pointer text-gray-800 font-semibold",
        "active:scale-95 transition-all duration-300",
      )}
    >
      <Icon name="Sparkle" className="size-5" />
    </button>
  );
};

export const Counter = (props: { count: number | undefined }) => (
  <div className="size-8 bg-gray-700 flex items-center rounded-full text-sm p-2 justify-center text-white">
    {props.count}
  </div>
);
