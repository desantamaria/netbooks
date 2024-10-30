"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import Link from "next/link";
import { MainNav } from "@/components/navbar/main-nav";
import { Search } from "@/components/navbar/search";
import { ModeToggle } from "@/components/theme/theme-button";
import { UserNav } from "@/components/navbar/user-nav";
import { Authenticated, Unauthenticated } from "convex/react";
import { handleSignIn } from "@/auth/serverAction";
import { Button } from "@/components/ui/button";
import Cart from "./cart";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";

export default function NavBar() {
  return (
    <div className="flex h-16 items-center px-4 border-b">
      {/* Left side */}
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] md:hidden py-20"
          >
            <MainNav className="flex flex-col gap-4 space-y-5 justify-center items-center" />
          </SheetContent>
        </Sheet>

        <Link href="/">
          <p className="font-bold text-primary hover:text-primary-foreground transition-colors">
            Netbooks
          </p>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:block">
          <MainNav className="mx-6 flex items-center space-x-4 lg:space-x-6" />
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center">
        <div className="hidden sm:block w-full max-w-xl">
          <Search />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <Unauthenticated>
          <form
            action={() => {
              return handleSignIn(window.location.href);
            }}
          >
            <Button type="submit">Sign in</Button>
          </form>
        </Unauthenticated>

        <Authenticated>
          <Cart />
          <UserNav />
        </Authenticated>
      </div>
    </div>
  );
}
