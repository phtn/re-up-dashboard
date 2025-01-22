"use client";

import {
  HTMLInputTypeAttribute,
  use,
  useActionState,
  useCallback,
} from "react";
import { Button } from "../ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
} from "../ui/sidebar";
import { SidebarCtx } from "@/app/ctx/sidebar";
import { InputOrigin } from "../ui/input";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";

interface InitialState {
  project_name: string;
  client_name: string;
  client_email: string;
}

export const CreateProject = () => {
  const { open, toggle } = use(SidebarCtx)!;

  const initialState: InitialState = {
    project_name: "",
    client_name: "",
    client_email: "",
  };

  const fn = useCallback((s: InitialState, f: FormData) => {
    const x = {
      project_name: f.get("project_name") as string,
      client_name: f.get("client_name") as string,
      client_email: f.get("client_email") as string,
    };
    console.log(x);
    return x;
  }, []);
  const [, action, pending] = useActionState(fn, initialState);

  return (
    <SidebarProvider open={open} onOpenChange={toggle} defaultOpen={false}>
      <Sidebar
        side="right"
        className={cn({ "absolute right-0 bg-background w-1/4": open })}
      >
        <SidebarHeader>
          <h2 className="p-2 font-semibold text-sm tracking-tight flex gap-2 items-center">
            <SparklesIcon className="size-4 stroke-1 fill-background text-muted-foreground" />
            Create a new project
          </h2>
        </SidebarHeader>
        <SidebarContent>
          <form action={action}>
            <div className="w-full p-4 space-y-6">
              {input_fields.map((field) => (
                <InputOrigin
                  key={field.name}
                  name={field.name}
                  label={field.label}
                />
              ))}
            </div>
            <div className="flex gap-2 w-full">
              <Button
                disabled={pending}
                className="w-full"
                size={"sm"}
                variant={"secondary"}
              >
                Cancel
              </Button>
              <Button
                disabled={pending}
                type="submit"
                className="w-full invert"
                size={"sm"}
                variant={"default"}
              >
                Save
              </Button>
            </div>
          </form>
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
};

interface InputField {
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  defaultValue?: string;
}
const input_fields: InputField[] = [
  {
    name: "project_name",
    label: "Project Name",
    type: "text",
  },
  {
    name: "client_name",
    label: "Client Name",
    type: "text",
  },
  {
    name: "client_email",
    label: "Client Email",
    type: "email",
  },
];
