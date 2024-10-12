import { mutation, query } from "./_generated/server";
import { getViewerId } from "./auth";
import { v } from "convex/values"
import { Id } from "./_generated/dataModel";

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// Users Functions
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
      email: v.optional(v.string()),
      image: v.optional(v.string()),
      addresses: v.optional(v.array(v.object({
        country: v.string(),
        fname: v.string(),
        lname: v.string(),
        street: v.string(),
        aptSuiteUnit: v.optional(v.string()),
        city: v.string(),
        state: v.string(),
        zipCode: v.string(),
        phone: v.string(),
        company: v.optional(v.string()),
        isDefault: v.boolean(),
      }))),
      updatedAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, {
        name: args.name,
        email: args.email,
        image: args.image,
        addresses: args.addresses,
        updatedAt: args.updatedAt
      });
    }
});

export const updateAddress = mutation({
    args: {
      id: v.id("users"),
      addresses: v.optional(v.array(v.object({
        country: v.string(),
        fname: v.string(),
        lname: v.string(),
        street: v.string(),
        aptSuiteUnit: v.optional(v.string()),
        city: v.string(),
        state: v.string(),
        zipCode: v.string(),
        phone: v.string(),
        company: v.optional(v.string()),
        isDefault: v.boolean(),
      }))),
      updatedAt: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.id, {
        addresses: args.addresses,
        updatedAt: args.updatedAt
      });
    }
});

// Books Functions
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
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const bookId = await ctx.db.insert("books", {
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId,
      });
      return bookId;
    },
  });

export const getBook = query({
    args: { id: v.id("books") },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
});

export const listBooks = query({
    handler: async (ctx) => {
        return ctx.db.query("books").collect();
    },
});

export const updateBook = mutation({
    args: {
      id: v.id("books"),
      title: v.optional(v.string()),
      authorIds: v.optional(v.array(v.id("authors"))),
      isbn: v.optional(v.string()),
      description: v.optional(v.string()),
      price: v.optional(v.number()),
      discount: v.optional(v.number()),
      stockQuantity: v.optional(v.number()),
      category: v.optional(v.array(v.object({id: v.id("categories"), name: v.string()}))),
      publisherId: v.optional(v.id("publishers")),
      publicationDate: v.optional(v.string()),
      language: v.optional(v.string()),
      format: v.optional(v.union(v.literal("hardcover"), v.literal("paperback"), v.literal("ebook"), v.literal("audiobook"))),
      pageCount: v.optional(v.number()),
      coverImageUrl: v.optional(v.string()),
      featured: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, {
        ...updateFields,
        updatedAt: new Date().toISOString(),
      });
    },
});

export const deleteBook = mutation({
    args: { id: v.id("books") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});

// Authors Functions 
export const createAuthor = mutation({
    args: {
      name: v.string(),
      biography: v.optional(v.string()),
      birthDate: v.optional(v.string()),
      nationality: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
      websiteUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const authorId = await ctx.db.insert("authors", {
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return authorId;
    },
});

export const getAuthor = query({
    args: { id: v.id("authors") },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
});

export const listAuthors = query({
    handler: async (ctx) => {
      return await ctx.db.query("authors").collect();
    },
});

export const updateAuthor = mutation({
    args: {
      id: v.id("authors"),
      name: v.optional(v.string()),
      biography: v.optional(v.string()),
      birthDate: v.optional(v.string()),
      nationality: v.optional(v.string()),
      photoUrl: v.optional(v.string()),
      websiteUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, {
        ...updateFields,
        updatedAt: new Date().toISOString(),
      });
    },
});

export const deleteAuthor = mutation({
    args: { id: v.id("authors") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});

// Categories Functions
export const createCategory = mutation({
    args: {
      name: v.string(),
      description: v.optional(v.string()),
      parentCategoryId: v.optional(v.id("categories")),
    },
    handler: async (ctx, args) => {
      const categoryId = await ctx.db.insert("categories", {
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return categoryId;
    },
});

export const getCategory = query({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
});

export const listCategories = query({
    handler: async (ctx) => {
      return await ctx.db.query("categories").collect();
    },
});

export const updateCategory = mutation({
    args: {
      id: v.id("categories"),
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      parentCategoryId: v.optional(v.id("categories")),
    },
    handler: async (ctx, args) => {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, {
        ...updateFields,
        updatedAt: new Date().toISOString(),
      });
    },
  });
  
  export const deleteCategory = mutation({
    args: { id: v.id("categories") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});

// Publishers Functions
export const createPublisher = mutation({
    args: {
      name: v.string(),
      description: v.optional(v.string()),
      website: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const publisherId = await ctx.db.insert("publishers", {
        ...args,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return publisherId;
    },
});
  
  export const getPublisher = query({
    args: { id: v.id("publishers") },
    handler: async (ctx, args) => {
      return await ctx.db.get(args.id);
    },
});

export const listPublishers = query({
    handler: async (ctx) => {
      return await ctx.db.query("publishers").collect();
    },
 });
  
  export const updatePublisher = mutation({
    args: {
      id: v.id("publishers"),
      name: v.optional(v.string()),
      description: v.optional(v.string()),
      website: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const { id, ...updateFields } = args;
      await ctx.db.patch(id, {
        ...updateFields,
        updatedAt: new Date().toISOString(),
      });
    },
});

export const deletePublisher = mutation({
    args: { id: v.id("publishers") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});

// Orders Functions
export const createOrder = mutation({
    args: {
      items: v.array(v.object({
        bookId: v.id("books"),
        quantity: v.number(),
        priceAtPurchase: v.number(),
      })),
      totalAmount: v.number(),
      status: v.union(v.literal("pending"), v.literal("processing"), v.literal("shipped"), v.literal("delivered"), v.literal("fulfilled"), v.literal("cancelled")),
      shippingAddress: v.optional(v.object({
        street: v.string(),
        city: v.string(),
        state: v.string(),
        zipCode: v.string(),
        country: v.string(),
      })),
      trackingNumber: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const orderId = await ctx.db.insert("orders", {
        ...args,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return orderId;
    },
});

// Cart Functions
export const createCart = mutation({
    args: {
      items: v.array(v.object({
        bookId: v.id("books"),
        quantity: v.number(),
      })),
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const cartId = await ctx.db.insert("cart", {
        userId,
        items: args.items,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return cartId;
    },
});

export const getCart = query({
    handler: async (ctx) => {
      const userId = await getViewerId(ctx);
      return await ctx.db.query("cart").filter(q => q.eq(q.field("userId"), userId)).first();
    },
});

export const updateCart = mutation({
    args: {
      items: v.array(v.object({
        bookId: v.id("books"),
        quantity: v.number(),
      })),
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const existingCart = await ctx.db.query("cart").filter(q => q.eq(q.field("userId"), userId)).first();
      if (existingCart) {
        await ctx.db.patch(existingCart._id, {
          items: args.items,
          updatedAt: new Date().toISOString(),
        });
      } else {
        await createCart(ctx, { items: args.items });
      }
    },
});

export const deleteCart = mutation({
    handler: async (ctx) => {
      const userId = await getViewerId(ctx);
      const existingCart = await ctx.db.query("cart").filter(q => q.eq(q.field("userId"), userId)).first();
      if (existingCart) {
        await ctx.db.delete(existingCart._id);
      }
    },
});

// Wishlist Functions
export const addToWishlist = mutation({
    args: {
      bookId: v.id("books"),
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const wishlistId = await ctx.db.insert("wishlist", {
        userId,
        bookId: args.bookId,
        createdAt: new Date().toISOString(),
      });
      return wishlistId;
    },
});

export const getWishlist = query({
    handler: async (ctx) => {
      const userId = await getViewerId(ctx);
      return await ctx.db.query("wishlist").filter(q => q.eq(q.field("userId"), userId)).collect();
    },
});

export const removeFromWishlist = mutation({
    args: {
      bookId: v.id("books"),
    },
    handler: async (ctx, args) => {
      const userId = await getViewerId(ctx);
      const wishlistItem = await ctx.db.query("wishlist")
        .filter(q => q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("bookId"), args.bookId)
        ))
        .first();
      if (wishlistItem) {
        await ctx.db.delete(wishlistItem._id);
      }
    },
});