"use client";

import {
  LaptopIcon,
  LucideIceCreamCone,
  MoonIcon,
  Settings2,
  SunIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useCallback, useMemo } from "react";
import { Mode } from "@/app/types";
import { setThemeState } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Icon } from "../ui/icons";
import { useIsMobile } from "@/hooks/use-mobile";
import { HyperList } from "../ui/list";

export function NavUser() {
  const { setTheme, theme } = useTheme();
  const isMobile = useIsMobile();

  const setMode = useCallback(
    (mode: Mode) => async () => {
      setTheme(mode);
      await setThemeState(mode);
    },
    [setTheme],
  );

  const modes: Modes[] = useMemo(
    () => [
      {
        id: 0,
        mode: "light",
        icon: SunIcon,
        fn: setMode("light"),
        isActive: theme === "light",
      },
      {
        id: 1,
        mode: "dark",
        icon: MoonIcon,
        fn: setMode("dark"),
        isActive: theme === "dark",
      },
      {
        id: 2,
        mode: "system",
        icon: LaptopIcon,
        fn: setMode("system"),
        isActive: theme === "system",
      },
    ],
    [setMode, theme],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"} className="bg-slate-200 dark:bg-transparent">
          <Icon name="Settings" className="text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg text-gray-950 border border-gray-400 dark:border-gray-300 dark:bg-gray-300 bg-gray-300"
        side={isMobile ? "left" : "right"}
        align="end"
        sideOffset={10}
        alignOffset={0}
      >
        <DropdownMenuLabel className="p-0 border-b border-gray-500 font-normal">
          <div className="flex items-center gap-2 p-3 bg-steel/20 text-left text-sm">
            <div className="flex items-start w-full h-fit p-0.5 text-sm leading-none justify-between">
              <span className="truncate font-semibold">Modes</span>
              <Settings2 className="size-4" />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <HyperList
            data={modes}
            component={ModeItem}
            keyId="id"
            container="p-2 space-y-0.5"
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const ModeItem = (mode: Modes) => (
  <DropdownMenuItem
    key={mode.id}
    className={cn(
      "justify-between capitalize rounded-md hover:bg-gray-400/60",
      {
        "bg-gray-400/40": mode.isActive,
      },
    )}
    onClick={mode.fn}
  >
    <mode.icon />
    {mode.mode}
  </DropdownMenuItem>
);

interface Modes {
  id: number;
  mode: Mode;
  icon: typeof LucideIceCreamCone;
  fn: VoidFunction;
  isActive: boolean;
}
