import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { authenticatedMutation } from "./functions/helpers";

export const getPaymentStatus = query({
  args: { paymentId: v.optional(v.id("payments")) },
  handler: async (ctx, { paymentId }) => {
    if (paymentId === undefined) {
      return null;
    }
    return (await ctx.db.get(paymentId))?.status;
  },
});

export const create = authenticatedMutation({
  args: { status: v.string() },
  handler: async (ctx, { status }) => {
    return await ctx.db.insert("payments", { status });
  },
});

export const markPending = internalMutation({
  args: { paymentId: v.id("payments"), stripeId: v.string() },
  handler: async (ctx, { paymentId, stripeId }) => {
    await ctx.db.patch(paymentId, { stripeId, status: "pending" });
  },
});

export const fulfill = internalMutation({
  args: { paymentId: v.id("payments"), stripeId: v.string() },
  handler: async (ctx, { paymentId, stripeId }) => {
    await ctx.db.patch(paymentId, { stripeId, status: "fulfilled" });
  },
});

// export const fulfill = internalMutation({
//   args: { stripeId: v.string() },
//   handler: async (ctx, { stripeId }) => {
//     const paymentId = (await ctx.db
//       .query("payments")
//       .withIndex("stripeId", (q) => q.eq("stripeId", stripeId))
//       .unique())!;
//     if (paymentId) {
//       await ctx.db.patch(paymentId._id, { status: "fulfilled" });
//     }
//   },
// });
