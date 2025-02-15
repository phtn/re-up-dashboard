import type { GenericValidator, Infer, VObject } from "convex/values";
import { v } from "convex/values";

const excludeProp = <T extends object>(o: T, ...keys: string[]) => {
  const ex = new Set(keys);
  return Object.fromEntries(Object.entries(o).filter(([k]) => !ex.has(k)));
};

export const SaleSchema = v.object({
  sale_id: v.optional(v.string()),
  txn_id: v.optional(v.string()),
  category: v.optional(v.string()),
  subcategory: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  photo_alt: v.optional(v.string()),
  item_id: v.optional(v.string()),
  item_name: v.optional(v.string()),
  item_brand: v.optional(v.string()),
  quantity: v.optional(v.number()),
  amount: v.optional(v.float64()),
  status: v.optional(v.string()),
  unit: v.optional(v.number()),
  unit_price: v.optional(v.float64()),
  customer_id: v.string(),
  customer_name: v.string(),
  customer_email: v.string(),
  customer_photo_url: v.optional(v.string()),
  updated_at: v.optional(v.float64()),
});

export type SelectSale = Infer<typeof SaleSchema>;

export const InsertSaleSchema = excludeProp(
  SaleSchema,
  "updated_at",
  "sale_id",
) as VObject<SelectSale, Record<string, GenericValidator>>;

export type InsertSale = Infer<typeof SaleSchema>;
