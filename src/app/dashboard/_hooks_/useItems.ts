import { ConvexCtx } from "@/app/ctx/convex";
import { onSuccess } from "@/app/ctx/toast";
import {
  Err,
  moonPicker,
  namePicker,
  parfumPicker,
  splitString,
  unamePicker,
  generateRandomAmount,
} from "@/utils/helpers";
import { Id } from "@/vx/_generated/dataModel";
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  use,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getPexels } from "../actions";
import { Photo } from "pexels";
import { InsertItem, SelectItem } from "@/vx/items/d";

export interface ConvexInternal {
  _id?: Id<"items">;
  _creationTime?: number;
}

export const useItems = () => {
  const [ix, setix] = useState<SelectItem[]>();
  const [, setsxId] = useState<Id<"items"> | null>(null);
  const [photo_url, setPhoto] = useState<string>();
  const [photo_urls, setPhotoURLs] = useState<Photo[] | undefined>();

  const getPhoto = useCallback(async () => {
    const pexels = await getPexels({
      query: "sapphire diamonds",
      locale: "fr-FR",
    });
    if ("error" in pexels) return;
    return pexels.photos;
  }, []);

  const [pending, fn] = useTransition();

  const setFn = <T>(
    tx: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    tx(async () => {
      await action().then(set).catch(Err);
    });
  };

  const { items } = use(ConvexCtx)!;

  const getAll = useCallback(async () => items.get.all(), [items]);

  const getIx = useCallback(() => {
    setFn(fn, getAll, setix);
  }, [getAll]);

  const addOne = useCallback(async () => {
    const fullname = namePicker();
    const [, lastname] = splitString(fullname);

    const selected_photo =
      photo_urls?.[Math.floor(Math.random() * (photo_urls?.length ?? 0))].src
        .original ?? "";
    setPhoto(selected_photo);

    const args: InsertItem = {
      category: lastname,
      subcategory: unamePicker(),
      item_name: parfumPicker(),
      item_brand: moonPicker(),
      unit_price: generateRandomAmount(),
      photo_url,
    };

    const id = await items.create(args);

    onSuccess(`1 item added!`);
    return id;
  }, [items, photo_url, photo_urls]);

  const addIx = useCallback(() => {
    setFn(fn, addOne, setsxId);
  }, [addOne]);

  const deleteOne = useCallback(
    async (id: Id<"items">) => {
      await items.delete(id);
    },
    [items],
  );

  const getPhotoURL = useCallback(() => {
    setFn(fn, getPhoto, setPhotoURLs);
  }, [getPhoto]);

  useEffect(() => {
    getIx();
    getPhotoURL();
  }, [getIx, getPhotoURL]);

  return { addIx, ix, deleteOne, pending };
};
