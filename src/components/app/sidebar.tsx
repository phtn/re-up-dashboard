"use client";

import { NavMain } from "@/components/app/nav-main";
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
  id: string;
  name: string;
  icon: IconName;
  url: string;
};

export interface NavItem {
  id?: string;
  title?: string; //"Playground"
  href?: string; //"#"
  icon: IconName;
  items?: ContentItem[];
}

interface SidebarData {
  user: UserData;
  projects: Project[];
  navMain: NavItem[];
  sub: NavItem[];
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
      id: "customers_0",
      title: "customers",
      href: "customers",
      icon: "UsersIcon2",
    },
    {
      id: "promos_1",
      title: "Sales & Marketing",
      href: "customers",
      icon: "ArrowUpDown",
    },
    {
      id: "settings_2",
      title: "Travel",
      href: "customers",
      icon: "Settings",
    },
    {
      id: "team_3",
      title: "Travel",
      href: "customers",
      icon: "Dashbox",
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
        container="space-y-10 w-full flex flex-col pt-2 h-fit items-center"
        delay={0.36}
      />
      <HyperList
        data={data.sub}
        component={SideBoob}
        container="space-y-10 w-full flex flex-col border-t border-gray-300 pt-8 h-fit items-center"
        delay={0.36}
      />
    </TooltipProvider>
  </div>
);

export const ProjectSwitcher = () => <Switcher projects={data.projects} />;

interface SideBoobProps extends NavItem {
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
            className={cn("size-6 stroke-1 relative z-[1]", {
              "text-white": nav === href,
            })}
          />
        </Link>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        align="center"
        sideOffset={12}
        className="relative capitalize duration-300 z-[100] bg-gray-800 text-white"
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
        </SidebarContent>
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
