import { CommanderSchema } from "@/vx/commanders/d";
import { defineSchema, defineTable } from "convex/server";
import { ProjectSchema } from "./projects/d";
import { CustomerSchema } from "./customers/d";
import { SaleSchema } from "./sales/d";
import { ItemSchema } from "./items/d";

export default defineSchema({
  customers: defineTable(CustomerSchema)
    .searchIndex("by_email", {
      searchField: "email",
    })
    .index("by_customer_id", ["customer_id"]),
  sales: defineTable(SaleSchema).searchIndex("by_sale_id", {
    searchField: "sale_id",
  }),
  items: defineTable(ItemSchema).searchIndex("by_item_id", {
    searchField: "item_id",
  }),
  commanders: defineTable(CommanderSchema)
    .searchIndex("by_email", {
      searchField: "email",
    })
    .index("by_account_id", ["account_id"]),
  projects: defineTable(ProjectSchema)
    .index("by_account_id", ["account_id"])
    .index("by_email", ["client_email"]),
});
