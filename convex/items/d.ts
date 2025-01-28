import { type Infer, v } from "convex/values";

export const ItemSchema = v.object({
  item_id: v.optional(v.string()),
  item_name: v.optional(v.string()),
  item_brand: v.optional(v.string()),
  release_date: v.optional(v.float64()),
  sku_id: v.optional(v.string()),
  is_active: v.optional(v.boolean()),
  is_featured: v.optional(v.boolean()),
  category: v.optional(v.string()),
  subcategory: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  photo_alt: v.optional(v.string()),
  quantity: v.optional(v.number()),
  unit: v.optional(v.float64()),
  unit_price: v.optional(v.float64()),
  updated_at: v.optional(v.float64()),
});

export type SelectItem = Infer<typeof ItemSchema>;
export type InsertItem = Infer<typeof ItemSchema>;
