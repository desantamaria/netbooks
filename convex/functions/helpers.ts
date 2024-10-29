import {
  customCtx,
  customMutation,
  customQuery,
} from "convex-helpers/server/customFunctions";
import { mutation, MutationCtx, query, QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";

export const getCurrentUser = async (ctx: QueryCtx | MutationCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return identity.subject as Id<"users">;
};

export const authenticatedQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return { user };
  })
);

export const authenticatedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    return { user };
  })
);
