import { mutation } from "@/vxs/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { id: v.id("sales") },
  handler: async ({ db }, { id }) => await db.delete(id),
});
