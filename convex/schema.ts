import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Book table
    books: defineTable({
        isbn: v.string(), // Ensure isbn is unique
        title: v.string(),
        rating: v.number(), // Could be computed as an aggregate from reviews
        price: v.number(),
        discountPrice: v.optional(v.number()),
        edition: v.string(),
        otherEdtn: v.optional(v.array(v.string())),
        genreIds: v.optional(v.id("genres")), // Linked to genres table
        publicationDate: v.optional(v.string()),
        publisher: v.optional(v.string()),
        pageCount: v.optional(v.number()),
        language: v.optional(v.string()),
        format: v.optional(v.string()),
        inventoryCount: v.optional(v.number()),
        coverImageUrl: v.optional(v.string()),
        description: v.optional(v.string()),
        tags: v.optional(v.array(v.string())),
        userId: v.id("users"), // Reference to users table (who added the book)
    }).index("by_isbn", ["isbn"]),

    // Authors table
    authors: defineTable({
        name: v.string(),
        bio: v.optional(v.string()),
        birthDate: v.optional(v.string()),
        nationality: v.optional(v.string()),
        // Removed userId unless necessary
    }).index("by_name", ["name"]),

    // Genres table
    genres: defineTable({
        name: v.string(), // Ensures unique genre names
    }).index("by_name", ["name"]),

    // Users table
    users: defineTable({
        name: v.string(),
        email: v.string(), // Enforce unique emails
        role: v.optional(v.string()), // Role like "admin" or "customer"
        // Removed userId since Convex automatically generates an ID
    }).index("by_email", ["email"]),

    // Reviews table
    reviews: defineTable({
        bookId: v.id("book"), // Reference to the book being reviewed
        userId: v.id("users"), // Reference to the user who wrote the review
        rating: v.number(), // Rating (e.g., 1-5 stars)
        reviewText: v.optional(v.string()), // The review text
        reviewDate: v.string(), // Date the review was posted
    }).index("by_book_id", ["bookId"]), // Index by bookId for efficient book review queries

    // BookAuthors table to model the many-to-many relationship
    bookAuthors: defineTable({
        bookId: v.id("book"), // Reference to the book
        authorId: v.id("authors"), // Reference to the author
    }).index("by_book_and_author", ["bookId", "authorId"]), // Composite index for efficient lookups
});
