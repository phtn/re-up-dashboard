import { guid } from "@/utils/helpers";
import { mutation } from "@/vxs/server";
import { ProjectSchema } from "@/vx/projects/d";
import { type GenericDatabaseWriter } from "convex/server";
import { type DataModel } from "@/vxs/dataModel";

export const create = mutation({
  args: ProjectSchema,
  handler: async ({ db }, data) => {
    const project = await checkProject(db, data.client_email);
    if (project !== null) {
      await db.patch(project._id, {
        updated_at: Date.now(),
      });
      return project._id;
    }

    await db.insert("projects", {
      ...data,
      client_email: data.client_email,
      client_id: guid(),
      account_id: guid(),
      updated_at: Date.now(),
    });
  },
});

export const checkProject = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  account_id: string,
) =>
  await db
    .query("projects")
    .withIndex("by_account_id", (q) => q.eq("account_id", account_id))
    .first();
