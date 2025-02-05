"use client";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Icon } from "@/components/ui/icons";
import { HyperList } from "@/components/ui/list";
import { ConvexInternal, useItems } from "../../_hooks_/useItems";
import { SelectItem } from "@/vx/items/d";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { Id } from "@/vx/_generated/dataModel";

export const Content = () => {
  const { addIx, ix, deleteOne } = useItems();
  const handleDeleteItem = useCallback(
    (id: Id<"items">) => async () => {
      return await deleteOne(id);
    },
    [deleteOne],
  );

  const CardItem = useCallback(
    (item: SelectItem & ConvexInternal) => (
      <Card className="p-0 relative overflow-hidden">
        <Image
          alt={String(item.item_name)}
          src={item.photo_url ?? "/re-up-icon_v2.svg"}
          width={0}
          height={0}
          className={cn(
            `bg-[('${item.photo_url}')] bg-cover h-56 w-full justify-center flex items-center`,
          )}
          unoptimized
        />
        <Button
          onClick={handleDeleteItem(item._id!)}
          size="icon"
          className="absolute top-2 right-2"
        >
          <Icon name="XMark" />
        </Button>
        <CardFooter className="p-0">
          <div className="flex w-full h-10 justify-between px-3 items-center">
            <p>{item.item_name}</p>
            <p>{item.unit_price}</p>
          </div>
        </CardFooter>
      </Card>
    ),
    [handleDeleteItem],
  );
  return (
    <main>
      <div className="w-full h-[85vh] p-2 md:p-4">
        <div className="h-20 flex items-start space-x-6">
          <Button
            onClick={addIx}
            className="bg-gray-300 text-gray-800"
            variant="outline"
          >
            <Icon name="PlusCircle" /> Add
          </Button>
          <Button className="" variant="outline">
            Filter
          </Button>
          <Button className="" variant="outline">
            Featured
          </Button>
          <Button className="" variant="outline">
            High
          </Button>
          <Button className="" variant="outline">
            Low
          </Button>
        </div>
        <HyperList
          data={ix}
          component={CardItem}
          container="grid grid-cols-2 w-full gap-2 md:gap-6 md:grid-cols-3 lg:grid-cols-4"
        />
      </div>
    </main>
  );
};
