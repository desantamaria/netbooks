"use client";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { PublisherForm } from "./publisher-form";

import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { PublisherEditForm } from "./publisher-form-edit";

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

const PublishersList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const viewerInfo = useQuery(api.functions.getUserInfo);
  const publishersList = useQuery(api.functions.listPublishers);
  const removePublisher = useMutation(api.functions.deletePublisher);

  const removeAddress = async (id: Id<"publishers">) => {
    if (viewerInfo) {
      await removePublisher({
        id: id,
      });
    } else {
      console.error("Missing User Info");
    }
  };

  const filteredPublishers = publishersList?.filter((publisher) =>
    publisher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search Publisher"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredPublishers && filteredPublishers.length > 0 ? (
        filteredPublishers.map(({ _id, name, createdAt, updatedAt }, index) => (
          <Card
            className="hover:shadow-lg transition-all duration-300"
            key={_id}
          >
            <CardHeader>
              <div className="flex items-center gap-4">
                <CardTitle>{name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div>
                <p>Created At: {formatDate(createdAt)}</p>
                <p>Updated At: {formatDate(updatedAt)}</p>
              </div>
              <div className="flex w-full justify-end gap-2">
                <PublisherEditForm type="edit" id={_id} />
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
        <p>No publishers found.</p>
      )}
      <PublisherForm className="w-full" type="add" />
    </div>
  );
};

export default PublishersList;
