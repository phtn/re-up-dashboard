import { type Infer, v } from "convex/values";

export const CommanderSchema = v.object({
  account_id: v.optional(v.string()),
  email: v.optional(v.string()),
});

export type Commander = Infer<typeof CommanderSchema>;
