"use client";

import {
  ChevronsUpDown,
  LaptopIcon,
  LucideIceCreamCone,
  MoonIcon,
  Settings2,
  SunIcon,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Mode } from "@/app/types";
import { setThemeState } from "@/app/actions";
import { cn } from "@/lib/utils";

interface NavUserProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}
export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const { setTheme, theme } = useTheme();

  const setMode = useCallback(
    (mode: Mode) => async () => {
      setTheme(mode);
      await setThemeState(mode);
    },
    [setTheme],
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
              <Avatar className="size-8 rounded-none">
                <AvatarImage
                  className="invert dark:invert-0"
                  src={user.avatar}
                  alt={user.name}
                />
                <AvatarFallback className="rounded-lg">XX</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-none">
                <span className="truncate font-bold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] mb-4 min-w-56 rounded-lg text-white bg-void"
            side={isMobile ? "bottom" : "top"}
            align="end"
            sideOffset={0}
            alignOffset={0}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 p-3 bg-steel/20 text-left text-sm">
                <div className="flex items-center w-full text-sm leading-none justify-between">
                  <span className="truncate font-semibold">Toggle Modes</span>
                  <Settings2 className="size-4" />
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup></DropdownMenuGroup>
            {modes.map((mode) => (
              <DropdownMenuItem
                key={mode.id}
                className={cn("justify-between capitalize hover:bg-steel/30", {
                  "bg-steel/20": mode.mode === theme,
                })}
                onClick={setMode(mode.mode)}
              >
                <mode.icon />
                {mode.mode}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

interface Modes {
  id: number;
  mode: Mode;
  icon: typeof LucideIceCreamCone;
}
const modes: Modes[] = [
  {
    id: 0,
    mode: "light",
    icon: SunIcon,
  },
  {
    id: 1,
    mode: "dark",
    icon: MoonIcon,
  },
  {
    id: 2,
    mode: "system",
    icon: LaptopIcon,
  },
];
