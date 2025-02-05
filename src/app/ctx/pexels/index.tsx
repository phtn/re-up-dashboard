"use client";

import { getPexels } from "@/app/dashboard/actions";
import { Err } from "@/utils/helpers";
import { Photo } from "pexels";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface PexelsCtxValues {
  images: Photo[] | undefined;
}

export const PexelsCtx = createContext<PexelsCtxValues | null>(null);

export const PexelsCtxProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<Photo[]>();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadImages = useCallback(async (page: number) => {
    setLoading(true);
    const response = await getPexels({
      query: "men's perfume",
      locale: "en-US",
      page,
    });
    if ("error" in response) {
      Err(setLoading, response.error);
      return;
    }

    setImages(response.photos);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadImages(page).catch((res) => {
      Err(setLoading);
      console.error(res);
    });
  }, [loadImages, page]);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);
  const prevPage = useCallback(() => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [page]);

  const value = useMemo(
    () => ({ images, nextPage, prevPage, loading }),
    [images, nextPage, prevPage, loading],
  );
  return <PexelsCtx value={value}>{children}</PexelsCtx>;
};
