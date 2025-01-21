import { CommanderSchema } from "@/vx/commanders/d";
import { defineSchema, defineTable } from "convex/server";
import { ProjectSchema } from "./projects/d";

export default defineSchema({
  commanders: defineTable(CommanderSchema)
    .index("by_account_id", ["account_id"])
    .index("by_email", ["email"]),
  projects: defineTable(ProjectSchema)
    .index("by_account_id", ["account_id"])
    .index("by_email", ["client_email"]),
});
