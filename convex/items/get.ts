import { query, mutation } from "@/vxs/server";
import { v } from "convex/values";

export const all = query({
  handler: async ({ db }) => (await db.query("items").collect()).reverse(),
});

export const byId = mutation({
  args: { item_id: v.string() },
  handler: async ({ db }, { item_id }) =>
    await db
      .query("items")
      .withIndex("by_item_id", (q) => q.eq("item_id", item_id))
      .first(),
});
