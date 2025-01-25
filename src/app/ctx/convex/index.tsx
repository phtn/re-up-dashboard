"use client";

import { env } from "@/env";
import { api } from "@/vx/_generated/api";
import { Id } from "@/vx/_generated/dataModel";
import { type InsertCustomer, SelectCustomer } from "@/vx/customers/d";
import { type InsertSale, SelectSale } from "@/vx/sales/d";
import {
  useMutation,
  useQuery,
  ConvexProvider,
  ConvexReactClient,
} from "convex/react";
import { createContext, useMemo, type ReactNode } from "react";

const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL);

interface ConvexCtxValues {
  customers: {
    create: (args: InsertCustomer) => Promise<Id<"customers"> | null>;
    get: {
      all: () => SelectCustomer[] | undefined;
      byId: (id: string) => Promise<SelectCustomer | null>;
    };
  };
  sales: {
    create: (args: InsertSale) => Promise<Id<"sales"> | null>;
    get: {
      all: () => SelectSale[] | undefined;
      byId: (id: string) => Promise<SelectSale | null>;
    };
  };
}
export const ConvexCtx = createContext<ConvexCtxValues | null>(null);

const CtxProvider = ({ children }: { children: ReactNode }) => {
  // CUSTOMERS
  const createCustomer = useMutation(api.customers.create.default);
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
  const createSale = useMutation(api.sales.create.default);
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

export const ConvexCtxProvider = ({ children }: { children: ReactNode }) => (
  <ConvexProvider client={convex}>
    <CtxProvider>{children}</CtxProvider>
  </ConvexProvider>
);
