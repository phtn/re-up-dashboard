"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icons";
import type { ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { NavUser } from "@/components/app/nav-user";
import { cn } from "@/lib/utils";

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
                  className="font-bold capitalize text-lg md:text-xl"
                >
                  {nav ?? `sales`}
                </BreadcrumbLink>
                <Button
                  className="hover:bg-gray-200 rounded-full size-7"
                  size={"icon"}
                >
                  <Icon name="PlusCircle" />
                </Button>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>
        {isMobile ? (
          <NavUser />
        ) : (
          <Button
            size={"sm"}
            variant={"outline"}
            className="bg-gray-900 text-white active:scale-95 transition-all duration-300"
          >
            <Icon name="PlusCircle" />
            Simulate Sale
          </Button>
        )}
      </div>
    </header>
  );
};

export const ActionButton = () => {
  return (
    <button
      className={cn(
        "size-12 flex items-center justify-center fixed right-8 bottom-8 z-50 rounded-full",
        "text-sm bg-amber-300 cursor-pointer",
        "active:scale-95 transition-all duration-300",
      )}
    >
      ƒ(x)
    </button>
  );
};
