import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";
import AddressList from "./address-list";

export default function SettingsAddressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Address</h3>
        <p className="text-sm text-muted-foreground">
          Update your address and set your default address.
        </p>
      </div>
      <Separator />
      <AddressList />
      <Toaster />
    </div>
  );
}
