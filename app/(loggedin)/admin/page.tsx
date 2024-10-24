"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import { BookForm } from "./book-listing-form";

export default function NewBookListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Create Book Listing</h3>
        <p className="text-sm text-muted-foreground">
          Update your Book listing.
        </p>
      </div>
      <Separator />
      <BookForm type="add" />
      <Toaster />
    </div>
  );
}
