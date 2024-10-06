/* eslint-disable @typescript-eslint/no-misused-promises */
import { auth, signIn } from "@/auth";
import { StickyHeader } from "@/components/layout/sticky-header";
import { UserNav } from "@/components/navbar/user-nav";
import { Button } from "@/components/ui/Button";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/navbar/main-nav";
import { Search } from "@/components/navbar/search";

export default function Home() {
  async function SignIn() {
    "use server";
    // Skip sign-in screen if the user is already signed in
    if ((await auth()) !== null) {
      redirect("/settings");
    }

    await signIn(undefined, { redirectTo: "/settings" });
  }

  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <p className="font-bold text-green-600">Netbooks</p>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4">
            <Search />
            <form action={SignIn}>
              <Button type="submit">Sign in</Button>
            </form>
          </div>
        </div>
      </div>
      <main className="container max-w-2xl flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold my-8 text-center text-green-600">
          NetBooks
        </h1>
        <p>The user doesn&apos;t need to log in to see this.</p>
        <p>To interact with the app log in via the button up top.</p>
      </main>
    </>
  );
}
