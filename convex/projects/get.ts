import { query, mutation } from "@/vxs/server";
import { v } from "convex/values";

export const all = query({
  handler: async ({ db }) => await db.query("projects").collect(),
});

export const byId = mutation({
  args: { account_id: v.string() },
  handler: async ({ db }, { account_id }) =>
    await db
      .query("projects")
      .withIndex("by_account_id", (q) => q.eq("account_id", account_id))
      .first(),
});

export const byEmail = mutation({
  args: { email: v.string() },
  handler: async ({ db }, { email }) =>
    await db
      .query("projects")
      .withIndex("by_email", (q) => q.eq("client_email", email))
      .first(),
});
