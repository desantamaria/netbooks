import { v } from "convex/values";
import { authenticatedMutation } from "./helpers";

export const generateUploadUrl = authenticatedMutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const removeFileById = authenticatedMutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.delete(args.storageId);
  },
});
