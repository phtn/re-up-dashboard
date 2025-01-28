"use server";

import { env } from "@/env";
import { createClient } from "pexels";

const pexels = createClient(env.PEXELS_API);

export const getPexels = async () => {
  const px = await pexels.photos.search({
    query: "fragrance",
    per_page: 1,
    size: "tiny",
    orientation: "square",
    locale: "ja-JP",
  });

  return px;
};
