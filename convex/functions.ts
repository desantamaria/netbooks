import { mutation, query } from "./_generated/server"

export const listBooks = query({
    handler: async (ctx) => {
        return await ctx.db.query("books").collect();
    }
});
