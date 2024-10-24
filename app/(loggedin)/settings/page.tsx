"use client";
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";
import { Toaster } from "@/components/ui/toaster";

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">My Account</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings.
        </p>
      </div>
      <Separator />
      <AccountForm />
      <Toaster />
    </div>
  );
}
