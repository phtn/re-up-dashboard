import { query, mutation } from "@/vxs/server";
import { v } from "convex/values";

export const all = query({
  handler: async ({ db }) => (await db.query("customers").collect()).reverse(),
});

export const byId = mutation({
  args: { customer_id: v.string() },
  handler: async ({ db }, { customer_id }) =>
    await db
      .query("customers")
      .withIndex("by_customer_id", (q) => q.eq("customer_id", customer_id))
      .first(),
});
