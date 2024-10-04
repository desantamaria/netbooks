import { Auth } from "convex/server";
import { Id } from "./_generated/dataModel";

export async function getViewerId(ctx: { auth: Auth }) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    throw new Error("User is not authenticated");
  }
  return identity.subject as Id<"users">;
}
