"use server";

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function handleSignIn(callbackUrl: string = "/") {
  "use server";
  // Skip sign-in screen if the user is already signed in
  if ((await auth()) !== null) {
    redirect(callbackUrl);
  }

  await signIn(undefined, { redirectTo: callbackUrl });
}

export async function handleSignOut(callbackUrl: string = "/") {
  await signOut({ redirectTo: callbackUrl });
}
