import { Metadata } from "next";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Separator } from "@/components/ui/separator";
import ConvexClientProvider from "@/app/ConvexClientProvider";
import { auth } from "@/auth";
import { Search } from "@/components/navbar/search";
import { MainNav } from "@/components/navbar/main-nav";
import { UserNav } from "@/components/navbar/user-nav";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your Account",
};

const sidebarNavItems = [
  {
    title: "My Account",
    href: "/loggedin/settings",
  },
  {
    title: "Address",
    href: "/loggedin/settings/address",
  },
];

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
            <p className="font-bold text-green-600">Netbooks</p>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <Search />
              <UserNav />
            </div>
          </div>
        </div>
        {children}
      </ConvexClientProvider>
    </>
  );
}
