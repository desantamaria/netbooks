/* eslint-disable @typescript-eslint/no-misused-promises */

import ConvexClientProvider from "@/app/ConvexClientProvider";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/Button";

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <div className="flex justify-between items-center">
        Convex + Next.js + Auth.js
        <SignOut />
      </div>
      <main className="container max-w-2xl flex flex-col gap-8">
        <ConvexClientProvider session={session}>
          {children}
        </ConvexClientProvider>
      </main>
    </>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <Button>Sign out</Button>
    </form>
  );
}
