import { guid } from "@/utils/helpers";
import { mutation } from "@/vxs/server";
import { SaleSchema } from "@/vx/sales/d";

const create = mutation({
  args: SaleSchema,
  handler: async ({ db }, data) => {
    await db.insert("sales", {
      ...data,
      sale_id: guid(),
      updated_at: Date.now(),
    });
  },
});
export default create;
