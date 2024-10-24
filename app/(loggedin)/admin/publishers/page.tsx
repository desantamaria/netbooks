"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import PublishersList from "./publishers-list";

export default function PublishersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Publishers</h3>
        <p className="text-sm text-muted-foreground">
          View create and edit Publishers.
        </p>
      </div>
      <Separator />
      <PublishersList />
      <Toaster />
    </div>
  );
}
