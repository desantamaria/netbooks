"use client";
/* eslint-disable @typescript-eslint/no-floating-promises */
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { CategoryForm } from "./category-form";

import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { CategoryEditForm } from "./category-form-edit";

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

const CategoriesList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const viewerInfo = useQuery(api.functions.getUserInfo);
  const categoriesList = useQuery(api.functions.listCategories);
  console.log(categoriesList);
  const removeCategory = useMutation(api.functions.deleteCategory);

  const removeAddress = async (id: Id<"categories">) => {
    if (viewerInfo) {
      await removeCategory({
        id: id,
      });
    } else {
      console.error("Missing User Info");
    }
  };

  const filteredCategories = categoriesList?.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="flex flex-col gap-5">
      <Input
        placeholder="Search Category"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredCategories && filteredCategories.length > 0 ? (
        filteredCategories.map(({ _id, name, createdAt, updatedAt }, index) => (
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
                <CategoryEditForm type="edit" id={_id} />
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
        <p>No categories found.</p>
      )}
      <CategoryForm className="w-full" type="add" />
    </div>
  );
};

export default CategoriesList;
