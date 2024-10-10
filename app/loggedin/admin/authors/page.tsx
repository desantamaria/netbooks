"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

export default function AuthorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Authors</h3>
        <p className="text-sm text-muted-foreground">
          Update your Book listing.
        </p>
      </div>
      <Separator />
      <Toaster />
    </div>
  );
}
