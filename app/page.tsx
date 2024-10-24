"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center text-primary">
          NetBooks
        </h1>
        <Unauthenticated>
          <p>The user doesn&apos;t need to log in to see this..</p>
        </Unauthenticated>
        <Authenticated>
          <p>You are logged in so you can see this.</p>
        </Authenticated>
      </main>
    </>
  );
}
