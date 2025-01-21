"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LucideIcon,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/app/nav-main";
import { NavProjects } from "@/components/app/nav-projects";
import { NavUser } from "@/components/app/nav-user";
import { Project, Switcher } from "@/components/app/nav-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { ComponentProps } from "react";

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

type SubContent = {
  id: number;
  name: string;
  icon: LucideIcon;
  url: string;
};

interface NavMainItem {
  title: string; //"Playground"
  url: string; //"#"
  icon: LucideIcon; //SquareTerminal
  isActive: boolean; //true
  items: ContentItem[];
}

/*
      [
                {
                  title: "History",
                  url: "#",
                },
                {
                  title: "Starred",
                  url: "#",
                },
                {
                  title: "Settings",
                  url: "#",
                },
              ]
      */

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
      name: "re-up.ph",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      id: 1,
      name: "FastInsure Tech",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      id: 2,
      name: "BiTicket",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          id: 0,
          title: "History",
          url: "#",
        },
        {
          id: 1,
          title: "Starred",
          url: "#",
        },
        {
          id: 2,
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      isActive: true,
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
          id: 0,
        },
        {
          title: "Explorer",
          url: "#",
          id: 1,
        },
        {
          title: "Quantum",
          url: "#",
          id: 2,
        },
      ],
    },
    {
      isActive: true,
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          id: 0,
          title: "Introduction",
          url: "#",
        },
        {
          id: 1,
          title: "Get Started",
          url: "#",
        },
        {
          id: 2,
          title: "Tutorials",
          url: "#",
        },
        {
          id: 3,
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      isActive: false,
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          id: 0,
          title: "General",
          url: "#",
        },
        {
          id: 1,
          title: "Team",
          url: "#",
        },
        {
          id: 2,
          title: "Billing",
          url: "#",
        },
        {
          id: 3,
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  sub: [
    {
      id: 0,
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      id: 1,
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      id: 2,
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Switcher projects={data.projects} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.sub} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
