import { type Infer, v } from "convex/values";

export const ProjectSchema = v.object({
  client_email: v.string(),
  account_id: v.optional(v.string()),
  client_id: v.optional(v.string()),
  client_name: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  is_active: v.optional(v.boolean()),
  created_by: v.string(),
  updated_at: v.optional(v.float64()),
});

export type SelectProject = Infer<typeof ProjectSchema>;
export type InsertProject = Infer<typeof ProjectSchema>;
