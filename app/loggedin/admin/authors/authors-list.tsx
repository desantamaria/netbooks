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
import { AuthorsForm } from "./author-form";
import { toast } from "@/hooks/use-toast";

import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function formatDate(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const AuthorsList = () => {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const authorsList = useQuery(api.functions.listAuthors);
  console.log(authorsList);
  //   const getAuthor = useQuery(api.functions.getAuthor);
  const removeAuthor = useMutation(api.functions.deleteAuthor);

  const removeAddress = async (id: Id<"authors">) => {
    if (viewerInfo) {
      await removeAuthor({
        id: id,
      });
    } else {
      console.error("Missing User Info");
    }
  };
  return (
    <div className="flex flex-col gap-5">
      {authorsList ? (
        authorsList?.map(
          ({ _id, name, createdAt, photoUrl, updatedAt }, index) => (
            <Card key={_id}>
              <CardHeader>
                <CardTitle>{name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Avatar>
                  <AvatarImage src={photoUrl} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p>Created At: {formatDate(createdAt)}</p>
                  <p>Updated At: {formatDate(updatedAt)}</p>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-end gap-2">
                  <AuthorsForm type="edit" index={index} />
                  <Button
                    onClick={() => {
                      removeAddress(_id);
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
      <AuthorsForm className="w-full" type="add" />
    </div>
  );
};

export default AuthorsList;
