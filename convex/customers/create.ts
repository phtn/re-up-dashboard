import { guid } from "@/utils/helpers";
import { mutation } from "@/vxs/server";
import { CustomerSchema } from "@/vx/customers/d";

const create = mutation({
  args: CustomerSchema,
  handler: async ({ db }, data) => {
    await db.insert("customers", {
      ...data,
      customer_id: guid(),
      updated_at: Date.now(),
    });
  },
});
export default create;
