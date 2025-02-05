import { ConvexCtx } from "@/app/ctx/convex";
import { onSuccess } from "@/app/ctx/toast";
import { ConvexInternal } from "@/components/ui/table/customers";
import {
  discountPicker,
  domainPicker,
  Err,
  generateRandomPhoneNumbers,
  namePicker,
  photoPicker,
  splitString,
  unamePicker,
} from "@/utils/helpers";
import { Id } from "@/vx/_generated/dataModel";
import { InsertCustomer, SelectCustomer } from "@/vx/customers/d";
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

export const useCustomers = () => {
  const [cx, setcx] = useState<(SelectCustomer & ConvexInternal)[]>();
  const [, setcxId] = useState<Id<"customers"> | null>(null);

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

  const { customers } = use(ConvexCtx)!;

  const getAll = useCallback(async () => customers.get.all(), [customers]);

  const getCx = useCallback(() => {
    setFn(fn, getAll, setcx);
  }, [getAll]);

  const addOne = useCallback(async () => {
    const username = unamePicker();
    const fullname = namePicker();
    const [firstname, lastname] = splitString(fullname);
    const args: InsertCustomer = {
      username,
      email: `${username}@${domainPicker()}`,
      fullname,
      firstname,
      lastname,
      phone_number: generateRandomPhoneNumbers(),
      photo_url: photoPicker(),
      discount_id: String(discountPicker()),
      is_active: Math.floor(Math.random() * 10) > 0.25,
    };

    const id = await customers.create(args);

    onSuccess(`1 Customer added!`);
    return id;
  }, [customers]);

  const addCx = useCallback(() => {
    setFn(fn, addOne, setcxId);
  }, [addOne]);

  const deleteOne = useCallback(
    async (id: Id<"customers">) => {
      await customers.delete(id);
    },
    [customers],
  );

  useEffect(() => {
    getCx();
  }, [getCx]);

  return { addCx, cx, deleteOne, pending };
};
