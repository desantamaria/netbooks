import { query } from "./_generated/server";
import { getViewerId } from "./auth";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.


export const getUserInfo = query({
    handler: async (ctx) => {
        const viewerId = await getViewerId(ctx);
        const viewerEmail = (await ctx.db.get(viewerId))!.email
        return ctx.db.query("users").withIndex("email", q => q.eq("email", viewerEmail)).collect();
    },
});
