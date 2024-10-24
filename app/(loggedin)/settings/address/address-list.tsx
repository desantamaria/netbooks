"use client";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Check } from "lucide-react";
import React from "react";
import { AddressForm } from "./address-form";
import { toast } from "@/hooks/use-toast";

const AddressList = () => {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateAddress = useMutation(api.functions.updateAddress);

  const removeAddress = async (index: number) => {
    if (viewerInfo && viewerInfo[0].addresses) {
      const updatedAddresses = [...viewerInfo[0].addresses];
      updatedAddresses.splice(index, 1);

      const updatedAt = new Date().toISOString();

      try {
        await updateAddress({
          id: viewerInfo[0]._id,
          addresses: updatedAddresses,
          updatedAt: updatedAt,
        });
        toast({ title: "Address removed successfully" });
      } catch (error) {
        console.error("Error removing address:", error);
        toast({ title: "Error removing address" });
      }
    } else {
      console.error("Missing User Info");
    }
  };

  const makeAddressDefault = async (index: number) => {
    if (viewerInfo && viewerInfo[0].addresses) {
      const updatedAddresses = [...viewerInfo[0].addresses];
      for (let i = 0; i < updatedAddresses.length; i++) {
        updatedAddresses[i].isDefault = false;
      }
      updatedAddresses[index].isDefault = true;
      const updatedAt = new Date().toISOString();

      try {
        await updateAddress({
          id: viewerInfo[0]._id,
          addresses: updatedAddresses,
          updatedAt: updatedAt,
        });
        toast({ title: "Default Address updated successfully" });
      } catch (error) {
        console.error("Error updating default address:", error);
        toast({ title: "Error updating default address" });
      }
    } else {
      console.error("Missing User Info");
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {viewerInfo ? (
        viewerInfo[0].addresses?.map(
          (
            { fname, lname, street, city, state, zipCode, phone, isDefault },
            index
          ) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Address {index + 1}:</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <p>
                    {fname} {lname}
                  </p>
                  <p>{street}</p>
                  <p>
                    {city}
                    {", "} {state} {zipCode}
                  </p>
                  <p>{phone}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-end gap-2">
                  {isDefault ? (
                    <Button disabled>
                      Default Address
                      <Check className="ml-1" />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        makeAddressDefault(index);
                      }}
                    >
                      Mark as Default <Check className="ml-1" />
                    </Button>
                  )}
                  <AddressForm type="edit" index={index} />
                  <Button
                    onClick={() => {
                      removeAddress(index);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )
        )
      ) : (
        <></>
      )}
      <AddressForm className="w-full" type="add" />
    </div>
  );
};

export default AddressList;
