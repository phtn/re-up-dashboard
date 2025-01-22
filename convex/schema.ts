import { CommanderSchema } from "@/vx/commanders/d";
import { defineSchema, defineTable } from "convex/server";
import { ProjectSchema } from "./projects/d";
import { CustomerSchema } from "./customers/d";

export default defineSchema({
  customers: defineTable(CustomerSchema)
    .searchIndex("by_email", {
      searchField: "email",
    })
    .index("by_account_id", ["account_id"]),
  commanders: defineTable(CommanderSchema)
    .searchIndex("by_email", {
      searchField: "email",
    })
    .index("by_account_id", ["account_id"]),
  projects: defineTable(ProjectSchema)
    .index("by_account_id", ["account_id"])
    .index("by_email", ["client_email"]),
});
