"use client";

import { NavMain } from "@/components/app/nav-main";
import { NavSub } from "@/components/app/nav-sub";
import { NavUser } from "@/components/app/nav-user";
import { Project, Switcher } from "@/components/app/nav-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";
import { type ComponentProps } from "react";
import { Icon, type IconName } from "../ui/icons";
import { cn } from "@/lib/utils";
import { HyperList } from "../ui/list";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { usePathname } from "next/navigation";
import Link from "next/link";

type UserData = {
  name: "xpriori";
  email: "in-command";
  avatar: "/re-up-icon_v2.svg";
};

type ContentItem = {
  id: number;
  title: string;
  url: string;
};

export type SubContent = {
  id: number;
  name: string;
  icon: IconName;
  url: string;
};

export interface NavMainItem {
  id?: string;
  title?: string; //"Playground"
  href?: string; //"#"
  icon: IconName;
  items?: ContentItem[];
}

interface SidebarData {
  user: UserData;
  projects: Project[];
  navMain: NavMainItem[];
  sub: SubContent[];
}

const data: SidebarData = {
  user: {
    name: "xpriori",
    email: "in-command",
    avatar: "/re-up-icon_v2.svg",
  },
  projects: [
    {
      id: 0,
      name: "x.com",
      logo: "XLogomark",
      plan: "Enterprise",
    },
    {
      id: 1,
      name: "apple.com",
      logo: "Apple",
      plan: "Startup",
    },
    {
      id: 2,
      name: "tesla.com",
      logo: "Tesla",
      plan: "Free",
    },
  ],
  navMain: [
    {
      id: "sales_0",
      title: "Sales",
      icon: "DollarCircle",
    },
    {
      id: "inventory_0",
      title: "Inventory",
      href: "inventory",
      icon: "ListSquare",
    },
    {
      id: "orders_0",
      title: "Orders",
      href: "orders",
      icon: "ArrowEnter",
    },
    {
      id: "fulfillment_0",
      title: "Fulfillment",
      href: "fulfillment",
      icon: "Box",
    },
    {
      id: "delivery_0",
      title: "Delivery",
      href: "delivery",
      icon: "ArrowForward",
    },
  ],

  sub: [
    {
      id: 0,
      name: "Design Engineering",
      url: "#",
      icon: "XLogomark",
    },
    {
      id: 1,
      name: "Sales & Marketing",
      url: "#",
      icon: "XLogomark",
    },
    {
      id: 2,
      name: "Travel",
      url: "#",
      icon: "XLogomark",
    },
  ],
};

export const NewSidebar = () => (
  <div className="flex flex-col items-center h-full space-y-8 pl-4 py-4 w-[5rem] border-0 border-avocado-300">
    <Switcher projects={data.projects} />

    <TooltipProvider delayDuration={0}>
      <HyperList
        data={data.navMain}
        component={SideBoob}
        container="space-y-10 w-full flex flex-col pt-2 h-[calc(86vh)] items-center"
        delay={0.36}
      />
    </TooltipProvider>
  </div>
);

interface SideBoobProps extends NavMainItem {
  icon: IconName;
}
const SideBoob = ({ icon, title, href, ...props }: SideBoobProps) => {
  const pathname = usePathname();
  const nav = pathname.split("/")[2];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          {...props}
          href={`/dashboard/${href ?? ""}`}
          className={cn(
            "outline-0 group/boob rounded-xl",
            "cursor-pointer flex items-center justify-center transition-all relative duration-300 ease-fluid active:scale-90 active:opacity-80",
          )}
        >
          <Icon
            name="Squircle"
            className={cn(
              "absolute pointer-events-none group-hover/boob:text-slate-200 size-10 text-white z-0",
              {
                "text-slate-900 group-hover/boob:text-slate-900": nav === href,
              },
            )}
          />
          <Icon
            name={icon}
            className={cn("size-6 relative z-[1]", {
              "text-white": nav === href,
            })}
          />
        </Link>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        align="center"
        sideOffset={12}
        className="relative duration-300 z-[100] bg-gray-800 text-white"
      >
        {title}
      </TooltipContent>
    </Tooltip>
  );
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Switcher projects={data.projects} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavSub items={data.sub} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
