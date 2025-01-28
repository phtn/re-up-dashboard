import { query, mutation } from "@/vxs/server";
import { v } from "convex/values";

export const all = query({
  handler: async ({ db }) => (await db.query("sales").collect()).reverse(),
});

export const byId = mutation({
  args: { sale_id: v.string() },
  handler: async ({ db }, { sale_id }) =>
    await db
      .query("sales")
      .withIndex("by_sale_id", (q) => q.eq("sale_id", sale_id))
      .first(),
});
