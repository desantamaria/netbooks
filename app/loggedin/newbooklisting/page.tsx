"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

export default function NewBookListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Post New Book Listing</h3>
        <p className="text-sm text-muted-foreground">Add new Book Listing</p>
      </div>
      <Separator />
      <Toaster />
    </div>
  );
}
