import { Metadata } from "next";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "../../../components/sidebar-nav";

export const metadata: Metadata = {
  title: "Netbooks Admin",
  description: "View Edit and Create Listings",
};

const sidebarNavItems = [
  {
    title: "Create Book Listings",
    href: "/loggedin/admin",
  },
  {
    title: "Authors",
    href: "/loggedin/admin/authors",
  },
  {
    title: "Publishers",
    href: "/loggedin/admin/publishers",
  },
  {
    title: "Categories",
    href: "/loggedin/admin/categories",
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="container w-screen flex flex-col gap-8">
        <div className="hidden space-y-6 p-10 pb-16 md:block">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h2>
            <p className="text-muted-foreground">
              Create Book listings, manage Author, Category and Publisher
              Information.
            </p>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="flex-1 lg:max-w-2xl">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
}
