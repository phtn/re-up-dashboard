"use client";

import { api } from "@/vx/_generated/api";
import { type InsertCustomer, SelectCustomer } from "@/vx/customers/d";
import { type InsertSale, SelectSale } from "@/vx/sales/d";
import { useMutation, useQuery } from "convex/react";
import { createContext, useMemo, type ReactNode } from "react";

interface ConvexCtxValues {
  customers: {
    create: (
      args: InsertCustomer,
    ) => Promise<(string & { __tableName: "customers" }) | null>;
    get: {
      all: () => SelectCustomer[] | undefined;
      byId: (id: string) => Promise<SelectCustomer | null>;
    };
  };
  sales: {
    create: (
      args: InsertSale,
    ) => Promise<(string & { __tableName: "sales" }) | null>;
    get: {
      all: () => SelectSale[] | undefined;
      byId: (id: string) => Promise<SelectSale | null>;
    };
  };
}
export const ConvexCtx = createContext<ConvexCtxValues | null>(null);

export const ConvexCtxProvider = ({ children }: { children: ReactNode }) => {
  // CUSTOMERS
  const createCustomer = useMutation(api.customers.create);
  const getAllCustomers = useQuery(api.customers.get.all);
  const getCustomerById = useMutation(api.customers.get.byId);

  const customers = useMemo(
    () => ({
      create: async (args: InsertCustomer) => await createCustomer(args),
      get: {
        all: () => getAllCustomers,
        byId: async (customer_id: string) =>
          await getCustomerById({ customer_id }),
      },
    }),
    [createCustomer, getCustomerById, getAllCustomers],
  );

  // SALES
  const createSale = useMutation(api.sales.create);
  const getAllSales = useQuery(api.sales.get.all);
  const getSaleById = useMutation(api.sales.get.byId);

  const sales = useMemo(
    () => ({
      create: async (args: InsertSale) => await createSale(args),
      get: {
        all: () => getAllSales,
        byId: async (sale_id: string) => await getSaleById({ sale_id }),
      },
    }),
    [createSale, getSaleById, getAllSales],
  );

  return <ConvexCtx value={{ sales, customers }}>{children}</ConvexCtx>;
};
