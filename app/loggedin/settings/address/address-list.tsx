"use client";
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

const AddressList = () => {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateUser = useMutation(api.functions.updateUser);
  return (
    <div className="flex flex-col gap-5">
      {viewerInfo ? (
        viewerInfo[0].addresses?.map(
          (
            { fname, lname, street, city, state, zipCode, phone, isDefault },
            index
          ) => (
            <Card>
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
                    <Button>
                      Mark as Default <Check className="ml-1" />
                    </Button>
                  )}

                  <AddressForm type="edit" />
                  <Button>Delete</Button>
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
