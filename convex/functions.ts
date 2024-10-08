import { mutation, query } from "./_generated/server";
import { getViewerId } from "./auth";
import { v } from "convex/values"

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// User Functions
export const getUserInfo = query({
    handler: async (ctx) => {
        const viewerId = await getViewerId(ctx);
        const viewerEmail = (await ctx.db.get(viewerId))!.email
        return ctx.db.query("users").withIndex("email", q => q.eq("email", viewerEmail)).collect();
    },
});

export const updateUser = mutation({
    args: {
        id: v.id("users"),
        name: v.optional(v.string()),
        image: v.optional(v.string()),
        addresses: v.optional(v.array(v.object({
            street: v.string(),
            city: v.string(),
            state: v.string(),
            zipCode: v.string(),
            country: v.string(),
            isDefault: v.boolean(),
          }))),
        updatedAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const getUser = await getViewerId(ctx);
        const user = await ctx.db.get(args.id)
        if(user?._id !== getUser) {
            throw new Error("Unathorized");
        }
        await ctx.db.patch(args.id, {
            name: args.name,
            image: args.image,
            addresses: args.addresses,
            updatedAt: args.updatedAt
        })
    }
});

// Book Functions
export const createBook = mutation({
    args: {
        title: v.string(),
        authorIds: v.array(v.id("authors")),
        isbn: v.string(),
        description: v.string(),
        price: v.number(),
        discount: v.optional(v.number()),
        stockQuantity: v.number(),
        category: v.array(v.object({id: v.id("categories"), name: v.string()})),
        publisherId: v.id("publishers"),
        publicationDate: v.string(),
        language: v.string(),
        format: v.union(v.literal("hardcover"), v.literal("paperback"), v.literal("ebook"), v.literal("audiobook")),
        pageCount: v.optional(v.number()),
        coverImageUrl: v.string(),
        featured: v.boolean(),
        createdAt: v.string(),
        updatedAt: v.string(),  
    },
    handler: async (ctx, args) => {
        const user = await getViewerId(ctx);
        await ctx.db.insert("books", {
            title: args.title,
            authorIds: args.authorIds,
            isbn: args.isbn,
            description: args.description,
            price: args.price,
            discount: args.discount,
            stockQuantity: args.stockQuantity,
            category: args.category,
            publisherId: args.publisherId,
            publicationDate: args.publicationDate,
            language: args.language,
            format: args.format,
            pageCount: args.pageCount,
            coverImageUrl: args.coverImageUrl,
            featured: args.featured,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            userId: user
        })
    }
})

export const listBooks = query({
    handler: async (ctx) => {
        return ctx.db.query("books").collect();
    },
});

export const updateBook = mutation({
    args: {
        id: v.id("books"),
        title: v.string(),
        authorIds: v.array(v.id("authors")),
        isbn: v.string(),
        description: v.string(),
        price: v.number(),
        discount: v.optional(v.number()),
        stockQuantity: v.number(),
        category: v.array(v.object({id: v.id("categories"), name: v.string()})),
        publisherId: v.id("publishers"),
        publicationDate: v.string(),
        language: v.string(),
        format: v.union(v.literal("hardcover"), v.literal("paperback"), v.literal("ebook"), v.literal("audiobook")),
        pageCount: v.optional(v.number()),
        coverImageUrl: v.string(),
        featured: v.boolean(),
        createdAt: v.string(),
        updatedAt: v.string(),  
    },
    handler: async (ctx, args) => {
        const user = await getViewerId(ctx);
        const book = await ctx.db.get(args.id);
        if(book?.userId !== user) {
            throw new Error("Unathorized");
        }
        await ctx.db.patch(args.id, {
            title: args.title,
            authorIds: args.authorIds,
            isbn: args.isbn,
            description: args.description,
            price: args.price,
            discount: args.discount,
            stockQuantity: args.stockQuantity,
            category: args.category,
            publisherId: args.publisherId,
            publicationDate: args.publicationDate,
            language: args.language,
            format: args.format,
            pageCount: args.pageCount,
            coverImageUrl: args.coverImageUrl,
            featured: args.featured,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            userId: user
        })
    }
});

export const deleteBook = mutation({
    args: {
        id: v.id("books")
    },
    handler: async (ctx, args) => {
        const user = await getViewerId(ctx);
        const book = await ctx.db.get(args.id);
        if(book?.userId !== user) {
            throw new Error("Unathorized");
        }
        await ctx.db.delete(args.id);
    }
})

// Author Functions 