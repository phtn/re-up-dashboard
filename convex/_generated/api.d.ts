/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as commanders_d from "../commanders/d.js";
import type * as customers_create from "../customers/create.js";
import type * as customers_d from "../customers/d.js";
import type * as customers_delete from "../customers/delete.js";
import type * as customers_get from "../customers/get.js";
import type * as items_d from "../items/d.js";
import type * as projects_create from "../projects/create.js";
import type * as projects_d from "../projects/d.js";
import type * as projects_get from "../projects/get.js";
import type * as sales_create from "../sales/create.js";
import type * as sales_d from "../sales/d.js";
import type * as sales_delete from "../sales/delete.js";
import type * as sales_get from "../sales/get.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "commanders/d": typeof commanders_d;
  "customers/create": typeof customers_create;
  "customers/d": typeof customers_d;
  "customers/delete": typeof customers_delete;
  "customers/get": typeof customers_get;
  "items/d": typeof items_d;
  "projects/create": typeof projects_create;
  "projects/d": typeof projects_d;
  "projects/get": typeof projects_get;
  "sales/create": typeof sales_create;
  "sales/d": typeof sales_d;
  "sales/delete": typeof sales_delete;
  "sales/get": typeof sales_get;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
