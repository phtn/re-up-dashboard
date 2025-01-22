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
import { Button } from "../ui/button";
import { Icon, IconName } from "../ui/icons";

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
        className="gap-2 p-2"
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
        <Button size={"icon"} className="bg-slate-200">
          <Icon name={activeProject.logo} className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 border border-gray-300 bg-slate-100 rounded-lg"
        align="start"
        side="right"
        sideOffset={12}
      >
        <DropdownMenuLabel className="text-xs text-gray-600">
          Projects
        </DropdownMenuLabel>

        <HyperList
          data={projects}
          component={ProjectItem}
          keyId="id"
          container="border-y border-gray-300"
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
          <div className="flex size-6 items-center justify-center bg-background">
            <Plus className="size-3.5" />
          </div>
          <div className="font-medium">Add Project</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
