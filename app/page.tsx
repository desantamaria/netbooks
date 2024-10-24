"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/theme-button";
import { Authenticated, Unauthenticated } from "convex/react";
import { handleSignIn, handleSignOut } from "@/auth/serverAction";

export default function Home() {
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <p className="font-bold text-primary">Netbooks</p>
          {/* <MainNav className="mx-6" /> */}
          <div className="ml-auto flex items-center space-x-4">
            {/* <Search /> */}
            <ModeToggle />

            <Authenticated>
              <form action={handleSignOut}>
                <Button type="submit">Sign out</Button>
              </form>
            </Authenticated>
            <Unauthenticated>
              <form action={handleSignIn}>
                <Button type="submit">Sign in</Button>
              </form>
            </Unauthenticated>
          </div>
        </div>
      </div>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center text-primary">
          NetBooks
        </h1>
        <Unauthenticated>
          <p>The user doesn&apos;t need to log in to see this..</p>
        </Unauthenticated>
        <Authenticated>
          <p>The user needs to log in to see this.</p>
        </Authenticated>
      </main>
    </>
  );
}
