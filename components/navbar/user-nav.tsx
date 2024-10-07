"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { handleSignOut } from "@/auth/serverAction";

export function UserNav() {
  const viewerInfo = useQuery(api.myFunctions.getUserInfo);
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
              {viewerInfo && viewerInfo[0]?.name
                ? viewerInfo[0].name
                : "example@user.com"}
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
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
