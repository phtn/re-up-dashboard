"use client";

import { use, useCallback, useState, type ElementType } from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarCtx } from "@/app/ctx/sidebar";
import { HyperList } from "../ui/list";

export interface Project {
  id: number;
  name: string;
  logo: ElementType;
  plan: string;
}
interface SwitcherProps {
  projects: Project[];
}

export function Switcher({ projects }: SwitcherProps) {
  const { isMobile } = useSidebar();
  const [activeProject, setActiveProject] = useState(projects[0]);

  const handleSelect = useCallback(
    (project: Project) => () => {
      setActiveProject(project);
    },
    [],
  );

  const { toggle } = use(SidebarCtx)!;

  const ProjectItem = useCallback(
    (project: Project) => (
      <DropdownMenuItem
        onClick={handleSelect(project)}
        key={project.name}
        className="gap-2 p-2"
      >
        <div className="flex size-6 items-center justify-center rounded-sm border">
          <project.logo className="size-4 shrink-0" />
        </div>
        {project.name}
        <DropdownMenuShortcut>⌘{project.id}</DropdownMenuShortcut>
      </DropdownMenuItem>
    ),
    [handleSelect],
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeProject.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject.name}
                </span>
                <span className="truncate text-xs">{activeProject.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={8}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>

            <HyperList data={projects} component={ProjectItem} keyId="id" />
            {/* {projects.map((project, index) => (
              <DropdownMenuItem
                key={project.name}
                onClick={handleSelect(project)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <project.logo className="size-4 shrink-0" />
                </div>
                {project.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))} */}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={toggle}
              className="gap-2 p-2 cursor-pointer"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium">Add Project</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
