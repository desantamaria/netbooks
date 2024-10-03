"use client";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { BookListings } from "./_components/book_listings";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="h-screen w-screen p-4">
      <h1 className="text-xl font-semibold">NetBooks</h1>
      {/* <div className="h-screen w-screen flex justify-center items-center"> */}
      <div className="">
        <Authenticated>
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Book Listings</h1>
          </div>
          <BookListings />
        </Authenticated>
        <Unauthenticated>
          <div className="h-screen flex items-center justify-center flex-col gap-3">
            <p className="text-white">Please sign in to continue</p>
            <Button className="bg-purple-500 hover:bg-purple-700">
              Sign in
            </Button>
          </div>
        </Unauthenticated>
        <AuthLoading>
          <div className="h-screen flex items-center justify-center flex-col gap-3">
            <p>Loading...</p>
          </div>
        </AuthLoading>
      </div>
    </div>
  );
}
