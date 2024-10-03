/* eslint-disable @typescript-eslint/no-misused-promises */

import { auth, signIn } from "@/auth";
import { StickyHeader } from "@/components/layout/sticky-header";
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";

export default function Home() {
  async function SignIn() {
    "use server";

    // Skip sign-in screen if the user is already signed in
    if ((await auth()) !== null) {
      redirect("/loggedin");
    }

    await signIn(undefined, { redirectTo: "/loggedin" });
  }

  return (
    <>
      <StickyHeader className="px-4 py-2">
        <div className="flex justify-between items-center">
          Convex + Next.js + Auth.js
          <form action={SignIn}>
            <Button type="submit">Sign in</Button>
          </form>
        </div>
      </StickyHeader>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center">
          Convex + Next.js + Auth.js
        </h1>
        <p>Here is where your marketing message goes.</p>
        <p>The user doesn&apos;t need to log in to see it.</p>
        <p>To interact with the app log in via the button up top.</p>
      </main>
    </>
  );
}
