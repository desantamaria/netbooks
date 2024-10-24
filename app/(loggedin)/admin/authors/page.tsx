"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import AuthorsList from "./authors-list";

export default function AuthorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Authors</h3>
        <p className="text-sm text-muted-foreground">
          View create and edit Authors.
        </p>
      </div>
      <Separator />
      <AuthorsList />
      <Toaster />
    </div>
  );
}
