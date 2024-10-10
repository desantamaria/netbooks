import { Metadata } from "next";

/* eslint-disable @typescript-eslint/no-misused-promises */
import ConvexClientProvider from "@/app/ConvexClientProvider";
import { auth } from "@/auth";
import { Search } from "@/components/navbar/search";
import { MainNav } from "@/components/navbar/main-nav";
import { UserNav } from "@/components/navbar/user-nav";
import { ModeToggle } from "@/components/theme/theme-button";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your Account",
};

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <ConvexClientProvider session={session}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <p className="font-bold text-primary">Netbooks</p>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <ModeToggle />
              <UserNav />
            </div>
          </div>
        </div>
        {children}
      </ConvexClientProvider>
    </>
  );
}
