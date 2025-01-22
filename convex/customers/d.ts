import { GenericValidator, type Infer, v, type VObject } from "convex/values";

const excludeProp = <T extends object>(o: T, ...keys: string[]) => {
  const ex = new Set(keys);
  return Object.fromEntries(Object.entries(o).filter(([k]) => !ex.has(k)));
};

export const CustomerSchema = v.object({
  account_id: v.optional(v.string()),
  discount_id: v.optional(v.string()),
  promo_id: v.optional(v.string()),
  tier_level: v.optional(v.string()),
  is_active: v.optional(v.string()),
  is_verified: v.optional(v.string()),
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
  updated_at: v.float64(),
});

export type SelectCustomer = Infer<typeof CustomerSchema>;

export const InsertCustomerSchema = excludeProp(
  CustomerSchema,
  "updated_at",
  "account_id",
) as VObject<SelectCustomer, Record<string, GenericValidator>>;

export type InsertCustomer = Infer<typeof InsertCustomerSchema>;
