"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */

import BookListings from "./_components/book-listings";

export default function Home() {
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
          <BookListings />
          {/* <Unauthenticated>
          <p>The user doesn&apos;t need to log in to see this..</p>
        </Unauthenticated>
        <Authenticated>
          <p>You are logged in so you can see this.</p>
        </Authenticated> */}
        </div>
      </main>
    </>
  );
}
