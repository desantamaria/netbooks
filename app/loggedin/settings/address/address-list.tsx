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
import React from "react";

const AddressList = () => {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateUser = useMutation(api.functions.updateUser);
  return (
    <div className="flex flex-col gap-5">
      {viewerInfo ? (
        viewerInfo[0].addresses?.map(
          ({ fname, lname, street, city, state, zipCode, phone }, index) => (
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
                  <Button>Mark as Default</Button>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </div>
              </CardFooter>
            </Card>
          )
        )
      ) : (
        <></>
      )}

      <Button className="w-full">Add New Address</Button>
    </div>
  );
};

export default AddressList;
