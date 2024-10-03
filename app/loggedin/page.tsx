"use client";
import { BookListings } from "../_components/book_listings";

export default function LoggedInHome() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Book Listings</h1>
      </div>
      <BookListings />
    </>
  );
}
