"use client";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { AuthorForm } from "./author-form";

import { Id } from "@/convex/_generated/dataModel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AuthorEditForm } from "./author-form-edit";

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
  const [searchQuery, setSearchQuery] = useState("");

  const viewerInfo = useQuery(api.functions.getUserInfo);
  const authorsList = useQuery(api.functions.listAuthors);
  console.log(authorsList);
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

  const filteredAuthors = authorsList?.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search Author"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredAuthors && filteredAuthors.length > 0 ? (
        filteredAuthors.map(({ _id, name, createdAt, image, updatedAt }) => (
          <Card
            className="hover:shadow-lg transition-all duration-300"
            key={_id}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={image} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <CardTitle>{name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p>Created At: {formatDate(createdAt)}</p>
                <p>Updated At: {formatDate(updatedAt)}</p>
              </div>
              <div className="flex w-full justify-end gap-2">
                <AuthorEditForm type="edit" id={_id} />
                <Button
                  onClick={() => {
                    removeAddress(_id);
                  }}
                >
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No authors found.</p>
      )}
      <AuthorForm className="w-full" type="add" />
    </div>
  );
};

export default AuthorsList;
