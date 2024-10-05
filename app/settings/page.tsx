"use client";
import { Separator } from "@/components/ui/separator";
import { ProfileForm } from "./profile-form";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function SettingsProfilePage() {
  const viewerInfo = useQuery(api.myFunctions.getUserInfo);
  console.log(viewerInfo);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
