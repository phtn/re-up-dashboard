"use server";

import { env } from "@/env";
import { createClient, PaginationParams } from "pexels";

export interface QueryData {
  query: string;
  locale: string;
}
const pexels = createClient(env.PEXELS_API);

export const getPexels = async (params: PaginationParams & QueryData) => {
  const px = await pexels.photos.search({
    query: params.query ?? "diamonds",
    per_page: params.per_page ?? 40,
    orientation: "square",
    locale: params.locale ?? "en-US",
  });

  return px;
};
