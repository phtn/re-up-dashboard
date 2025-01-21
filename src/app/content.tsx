"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader, ShieldCheck } from "lucide-react";
import { use } from "react";
import { AuthCtx } from "./ctx/auth";

export const Content = () => {
  const { authenticate, loading } = use(AuthCtx)!;
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <div>
        <Avatar className="w-48 h-auto md:size-96 rounded-none">
          <AvatarImage
            className="invert dark:invert-0"
            src={"/re-up-ascii.png"}
            alt={"re-up-logomark-ascii.png"}
          />
          <AvatarFallback className="rounded-lg">RU</AvatarFallback>
        </Avatar>
        <div className="w-full md:w-96 h-24 flex items-center justify-start">
          <Button variant={"outline"} size="sm" onClick={authenticate}>
            Authenticate
            {loading ? (
              <Loader className="animate-spin text-muted-foreground" />
            ) : (
              <ShieldCheck className="text-muted-foreground" />
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};
