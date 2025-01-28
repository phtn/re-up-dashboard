import { ConvexCtx } from "@/app/ctx/convex";
import { onSuccess } from "@/app/ctx/toast";
import { ConvexInternal } from "@/components/ui/table/customers";
import {
  Err,
  guid,
  moonPicker,
  namePicker,
  parfumPicker,
  photoPicker,
  splitString,
  unamePicker,
  generateRandomAmount,
} from "@/utils/helpers";
import { Id } from "@/vx/_generated/dataModel";
import { SelectCustomer } from "@/vx/customers/d";
import { InsertSale, SelectSale } from "@/vx/sales/d";
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

export const useSales = () => {
  const [sx, setsx] = useState<(SelectSale & ConvexInternal)[]>();
  const [, setsxId] = useState<Id<"sales"> | null>(null);
  const [cx, setcx] = useState<(SelectCustomer & ConvexInternal)[]>();
  const [photo_url, setPhoto] = useState<string>();

  const getPhoto = useCallback(async () => {
    const pexels = await getPexels();
    if ("error" in pexels) return;
    return pexels.photos[0].src.tiny;
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

  const { sales, customers } = use(ConvexCtx)!;

  const getAll = useCallback(async () => sales.get.all(), [sales]);

  const getSx = useCallback(() => {
    setFn(fn, getAll, setsx);
  }, [getAll]);

  const getAllCx = useCallback(async () => customers.get.all(), [customers]);

  const getCx = useCallback(() => {
    setFn(fn, getAllCx, setcx);
  }, [getAllCx]);

  const cxPicker = useCallback(() => {
    if (!cx) {
      getCx();
    }
    return cx?.[Math.floor(Math.random() * cx.length)];
  }, [cx, getCx]);

  const addOne = useCallback(async () => {
    const fullname = namePicker();
    const [, lastname] = splitString(fullname);

    const args: InsertSale = {
      category: lastname,
      subcategory: unamePicker(),
      item_id: guid(),
      item_name: parfumPicker(),
      item_brand: moonPicker(),
      amount: generateRandomAmount(),
      photo_url: photo_url,
      customer_id: cxPicker()?.customer_id ?? "",
      customer_name: cxPicker()?.fullname ?? "",
      customer_email: cxPicker()?.email ?? "",
      customer_photo_url: photoPicker(),
    };

    const id = await sales.create(args);

    onSuccess(`1 item sold!`);
    return id;
  }, [sales, cxPicker, photo_url]);

  const addSx = useCallback(() => {
    setFn(fn, addOne, setsxId);
  }, [addOne]);

  const deleteOne = useCallback(
    async (id: Id<"sales">) => {
      await sales.delete(id);
    },
    [sales],
  );

  const getPhotoURL = useCallback(() => {
    setFn(fn, getPhoto, setPhoto);
  }, [getPhoto]);

  useEffect(() => {
    getSx();
    getPhotoURL();
  }, [getSx, getPhotoURL]);

  return { addSx, sx, deleteOne, pending };
};
