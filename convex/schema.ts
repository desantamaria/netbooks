import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Books table
  books: defineTable({
    title: v.string(),
    authorIds: v.array(v.id("authors")),
    isbn: v.string(),
    description: v.string(),
    price: v.number(),
    discountPrice: v.optional(v.number()),
    stockQuantity: v.number(),
    categoryId: v.id("categories"),
    publisherId: v.id("publishers"),
    publicationDate: v.string(),
    language: v.string(),
    format: v.union(v.literal("hardcover"), v.literal("paperback"), v.literal("ebook"), v.literal("audiobook")),
    pageCount: v.optional(v.number()),
    coverImageUrl: v.string(),
    featured: v.boolean(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_isbn", ["isbn"])
    .index("by_category", ["categoryId"])
    .index("by_featured", ["featured"]),

  // Authors table
  authors: defineTable({
    name: v.string(),
    biography: v.optional(v.string()),
    birthDate: v.optional(v.string()),
    nationality: v.optional(v.string()),
    photoUrl: v.optional(v.string()),
    websiteUrl: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_name", ["name"]),

  // Categories table
  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    parentCategoryId: v.optional(v.id("categories")),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_name", ["name"]),

  // Publishers table
  publishers: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    website: v.optional(v.string()),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_name", ["name"]),

  // Users table
  users: defineTable({
    name: v.string(),
    email: v.string(),
    role: v.union(v.literal("admin"), v.literal("customer")),
    addresses: v.array(v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
      isDefault: v.boolean(),
    })),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_email", ["email"]),

  // Orders table
  orders: defineTable({
    userId: v.id("users"),
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
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  // Reviews table
  reviews: defineTable({
    bookId: v.id("books"),
    userId: v.id("users"),
    rating: v.number(),
    comment: v.string(),
    createdAt: v.string(),
    updatedAt: v.string(),
  })
    .index("by_book", ["bookId"])
    .index("by_user", ["userId"]),

  // Cart table
  cart: defineTable({
    userId: v.id("users"),
    items: v.array(v.object({
      bookId: v.id("books"),
      quantity: v.number(),
    })),
    createdAt: v.string(),
    updatedAt: v.string(),
  }).index("by_user", ["userId"]),

  // Wishlist table
  wishlist: defineTable({
    userId: v.id("users"),
    bookId: v.id("books"),
    createdAt: v.string(),
  })
    .index("by_user", ["userId"])
    .index("by_book", ["bookId"]),
});