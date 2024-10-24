"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { handleSignOut } from "@/auth/serverAction";
import Link from "next/link";
import { MonitorCog } from "lucide-react";

export function UserNav() {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                viewerInfo && viewerInfo[0]?.image ? viewerInfo[0].image : ""
              }
              alt="user"
            />
            <AvatarFallback>
              {viewerInfo && viewerInfo[0]?.name
                ? viewerInfo[0].name?.charAt(0)
                : "A"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {viewerInfo && viewerInfo[0]?.name ? viewerInfo[0].name : "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {viewerInfo && viewerInfo[0]?.email
                ? viewerInfo[0].email
                : "example@user.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href="/settings" className="w-full h-full">
              Manage Account
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
          <Link href="/library" className="w-full">
            My Digital Library
          </Link>
            </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link href="/settings/address" className="w-full h-full">
              Address Book
            </Link>
          </DropdownMenuItem>

          {viewerInfo && viewerInfo[0]?.isAdmin ? (
            <DropdownMenuItem>
              <Link
                href="/admin"
                className="w-full h-full flex items-center gap-2"
              >
                Admin <MonitorCog className="w-4 h-4" />
              </Link>
            </DropdownMenuItem>
          ) : (
            <></>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SignOut() {
  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSignOut();
      }}
    >
      <button type="submit" className="w-full">
        <p className="text-left">Sign out</p>
      </button>
    </form>
  );
}
