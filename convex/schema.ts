import { defineSchema, defineTable } from "convex/server";
import { Validator, v } from "convex/values";

// The users, accounts, sessions and verificationTokens tables are modeled
// from https://authjs.dev/getting-started/adapters#models

export const userSchema = {
    email: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    emailVerified: v.optional(v.number()),
    isAdmin: v.optional(v.boolean()),
    addresses: v.optional(v.array(v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
      isDefault: v.boolean(),
    }))),
    updatedAt: v.optional(v.string()),
  };
  
  export const sessionSchema = {
    userId: v.id("users"),
    expires: v.number(),
    sessionToken: v.string(),
  };
  
  export const accountSchema = {
    userId: v.id("users"),
    type: v.union(
      v.literal("email"),
      v.literal("oidc"),
      v.literal("oauth"),
      v.literal("webauthn"),
    ),
    provider: v.string(),
    providerAccountId: v.string(),
    refresh_token: v.optional(v.string()),
    access_token: v.optional(v.string()),
    expires_at: v.optional(v.number()),
    token_type: v.optional(v.string() as Validator<Lowercase<string>>),
    scope: v.optional(v.string()),
    id_token: v.optional(v.string()),
    session_state: v.optional(v.string()),
  };
  
  export const verificationTokenSchema = {
    identifier: v.string(),
    token: v.string(),
    expires: v.number(),
  };
  
  export const authenticatorSchema = {
    credentialID: v.string(),
    userId: v.id("users"),
    providerAccountId: v.string(),
    credentialPublicKey: v.string(),
    counter: v.number(),
    credentialDeviceType: v.string(),
    credentialBackedUp: v.boolean(),
    transports: v.optional(v.string()),
  };
  
  const authTables = {
    users: defineTable(userSchema).index("email", ["email"]),
    sessions: defineTable(sessionSchema)
      .index("sessionToken", ["sessionToken"])
      .index("userId", ["userId"]),
    accounts: defineTable(accountSchema)
      .index("providerAndAccountId", ["provider", "providerAccountId"])
      .index("userId", ["userId"]),
    verificationTokens: defineTable(verificationTokenSchema).index(
      "identifierToken",
      ["identifier", "token"],
    ),
    authenticators: defineTable(authenticatorSchema)
      .index("userId", ["userId"])
      .index("credentialID", ["credentialID"]),
  };


export default defineSchema({
  // Auth Tables from above
  ...authTables,

  // Books table
  books: defineTable({
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
    userId: v.id("users"),
  })
    .index("by_isbn", ["isbn"])
    .index("by_category", ["category"])
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
  numbers: defineTable({
    value: v.number(),
  }),
    
});