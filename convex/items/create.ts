import { guid } from "@/utils/helpers";
import { mutation } from "@/vxs/server";
import { ItemSchema } from "@/vx/items/d";

const create = mutation({
  args: ItemSchema,
  handler: async ({ db }, data) => {
    await db.insert("items", {
      ...data,
      item_id: guid(),
      updated_at: Date.now(),
    });
  },
});
export default create;
