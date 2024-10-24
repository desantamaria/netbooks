"use client";

import Link from "next/link";
import { MainNav } from "@/components/navbar/main-nav";
import { Search } from "@/components/navbar/search";
import { ModeToggle } from "@/components/theme/theme-button";
import { UserNav } from "@/components/navbar/user-nav";
import { Authenticated, Unauthenticated } from "convex/react";
import { handleSignIn } from "@/auth/serverAction";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/">
          <p className="font-bold text-primary hover:text-primary-foreground transition-colors">
            Netbooks
          </p>
        </Link>
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <ModeToggle />
          <Unauthenticated>
            <form action={() => handleSignIn(window.location.href)}>
              <Button type="submit">Sign in</Button>
            </form>
          </Unauthenticated>

          <Authenticated>
            <UserNav />
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
