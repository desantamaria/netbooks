"use client";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import CategoriesList from "./categories-list";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Categories</h3>
        <p className="text-sm text-muted-foreground">
          View create and edit Categories.
        </p>
      </div>
      <Separator />
      <CategoriesList />
      <Toaster />
    </div>
  );
}
