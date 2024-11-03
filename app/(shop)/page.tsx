"use client";

import { useQuery } from "convex/react";
/* eslint-disable @typescript-eslint/no-misused-promises */

import BookListings from "./_components/book-listings";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const books = useQuery(api.functions.listBooks) || ([] as const);
  console.log(typeof books, books); // This will show you the actual structure
  return (
    <>
      <main className="container w-screen h-full flex flex-col gap-8">
        <div className="overflow-scroll">
          <h1 className="text-4xl font-extrabold my-8 text-center text-primary">
            NetBooks
          </h1>
          <h1 className="text-xl font-extrabold my-8 text-center">
            Featured Books
          </h1>
          <BookListings books={books} />
        </div>
      </main>
    </>
  );
}
