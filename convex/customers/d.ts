import { GenericValidator, type Infer, v, type VObject } from "convex/values";

const excludeProp = <T extends object>(o: T, ...keys: string[]) => {
  const ex = new Set(keys);
  return Object.fromEntries(Object.entries(o).filter(([k]) => !ex.has(k)));
};

export const CustomerSchema = v.object({
  customer_id: v.optional(v.string()),
  discount_id: v.optional(v.string()),
  promo_id: v.optional(v.string()),
  tier_level: v.optional(v.string()),
  is_active: v.optional(v.boolean()),
  is_verified: v.optional(v.boolean()),
  username: v.optional(v.string()),
  fullname: v.optional(v.string()),
  firstname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  gender: v.optional(v.string()),
  favorites: v.optional(v.array(v.string())),
  email: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  metadata: v.optional(v.record(v.string(), v.any())),
  updated_at: v.optional(v.float64()),
});

export type SelectCustomer = Infer<typeof CustomerSchema>;

export const InsertCustomerSchema = excludeProp(
  CustomerSchema,
  "updated_at",
  "customer_id",
) as VObject<
  Omit<SelectCustomer, "updated_at" | "customer_id">,
  Record<keyof SelectCustomer, GenericValidator>
>;

export type InsertCustomer = Infer<typeof InsertCustomerSchema>;
