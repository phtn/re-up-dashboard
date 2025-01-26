"use client";

import { useCallback, useState } from "react";
import { Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HyperList } from "../ui/list";
import { Icon, IconName } from "../ui/icons";
import { useIsMobile } from "@/hooks/use-mobile";

export interface Project {
  id: number;
  name: string;
  logo: IconName;
  plan: string;
}
export interface SwitcherProps {
  projects: Project[];
}

export function Switcher({ projects }: SwitcherProps) {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const isMobile = useIsMobile();

  const handleSelect = useCallback(
    (project: Project) => () => {
      setActiveProject(project);
    },
    [],
  );

  const ProjectItem = useCallback(
    (project: Project) => (
      <DropdownMenuItem
        onClick={handleSelect(project)}
        key={project.name}
        className="gap-2 p-2 cursor-pointer hover:bg-zinc-400/30"
      >
        <div className="flex size-6 items-center justify-center">
          <Icon name={project.logo} className="size-3.5 shrink-0" />
        </div>
        {project.name}
        <DropdownMenuShortcut>⌘{project.id}</DropdownMenuShortcut>
      </DropdownMenuItem>
    ),
    [handleSelect],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex justify-center">
        <button className="dark:bg-transparent size-8 flex items-center justify-center">
          <Icon name={activeProject.logo} className="size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 border border-gray-400 dark:border-gray-300 text-gray-950 bg-gray-300 dark:bg-gray-300 rounded-t-md rounded-b-lg"
        align="start"
        side="right"
        sideOffset={isMobile ? 8 : 12}
      >
        <DropdownMenuLabel className="text-xs py-3 flex justify-between">
          <p className="font-bold">Projects</p>
          <p className="bg-gray-400/20 size-4 flex items-center justify-center rounded-md">
            {projects.length}
          </p>
        </DropdownMenuLabel>

        <HyperList
          data={projects}
          component={ProjectItem}
          keyId="id"
          container="border-y border-gray-500"
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2 cursor-pointer hover:bg-zinc-400/30">
          <div className="flex size-6 items-center justify-center">
            <Plus className="size-3.5" />
          </div>
          <div className="font-medium">Add Project</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
