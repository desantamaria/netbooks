"use server";

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignIn() {
  "use server";
  // Skip sign-in screen if the user is already signed in
  if ((await auth()) !== null) {
    redirect("/loggedin");
  }

  await signIn(undefined, { redirectTo: "/loggedin" });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
