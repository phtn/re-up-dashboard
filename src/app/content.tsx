"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader, ShieldCheck } from "lucide-react";
import { use } from "react";
import { AuthCtx } from "./ctx/auth";
import { Icon, IconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { HyperList } from "@/components/ui/list";
import Link from "next/link";

export const Content = () => {
  return (
    <div className="h-screen w-full">
      <Navbar />
      <Body />
    </div>
  );
};

const Navbar = () => {
  const { authenticate, loading } = use(AuthCtx)!;

  return (
    <section className="flex justify-between items-center border-b dark:border-gray-800 border-gray-200">
      <div className="flex h-14 px-2 md:px-4 gap-4 items-center">
        <Avatar className="w-8 h-auto size md:size-8 rounded-none">
          <AvatarImage
            className="invert dark:invert-0"
            src={"/re-up-icon_v2.svg"}
            alt={"re-up-logomark-ascii.png"}
          />
          <AvatarFallback className="rounded-lg">RU</AvatarFallback>
        </Avatar>
        <div className="font-bold tracking-tight">Playground</div>
      </div>
      <div className="px-2 md:px-4">
        <Button
          size="sm"
          onClick={authenticate}
          className="bg-gray-100 dark:bg-transparent"
        >
          Authenticate
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <ShieldCheck className="" />
          )}
        </Button>
      </div>
    </section>
  );
};

const Body = () => (
  <main className="w-full h-full bg-[#fafafa] dark:invert md:p-4 py-4 px-2">
    {/* <section className="h-10 flex gap-2 text-gray-950 items-start w-full">
      <Icon name="Apps" />
      <h1 className="font-bold text-xs">Apps</h1>
    </section> */}
    <HyperList
      data={grounds}
      component={CardItem}
      container="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-8 w-full"
      keyId="id"
    />
  </main>
);

interface Ground {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: IconName;
}
const grounds: Ground[] = [
  {
    id: 0,
    title: "dashboard",
    description: "",
    href: "/dashboard",
    icon: "Dashbox",
  },
];
const CardItem = (ground: Ground) => (
  <Link href={ground.href}>
    <button
      className={cn(
        "group/btn pentagon bg-gray-600 text-gray-900 space-y-4",
        "transition-all p-px duration-300",
        "cursor-pointer rounded-sm relative drop-shadow-md",
      )}
    >
      <div className="flex items-center gap-1 px-3">
        <Icon name="Dashbox" className="text-gray-800 z-1" />
        <p className="text-[14px] z-1 relative dark:text-gray-900 capitalize">
          {ground.title}
        </p>
      </div>
      <div className="flex justify-center">
        <Icon
          name="ArrowRight"
          className={cn(
            "-translate-x-6 z-1 text-gray-900",
            "group-hover/btn:-translate-x-2",
            "transition-all duration-300",
          )}
        />
      </div>
      <div
        className={cn(
          "absolute top-px left-px z-0 pentagon-inner bg-gray-200 rounded-[3px]",
          " pointer-events-none",
          " group-hover/btn:bg-gray-300 transition-all duration-300",
        )}
      />
    </button>
  </Link>
);
