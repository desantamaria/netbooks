"use client";
import React from "react";
import { Code } from "@/components/typography/code";
import { Link } from "@/components/typography/link";
import { Button } from "@/components/ui/Button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoggedInHome() {
  const viewerInfo = useQuery(api.myFunctions.getUserInfo);

  if (viewerInfo === undefined) {
    return (
      <div className="mt-8">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px] mt-4" />
      </div>
    );
  }

  if (viewerInfo.length === 0) {
    return <p className="mt-8">No user information found.</p>;
  }

  const user = viewerInfo[0];

  return (
    <div className="flex flex-col  justify-center">
      <p className="mt-8">Welcome {user.name}</p>
      <p>Account JSON:</p>
      <div className="mt-2 p-4 bg-gray-100 rounded w-[63vw]">
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div className="flex gap-2">
        <p>Name: </p>
        <p>{user.name}</p>
      </div>
      <div className="flex gap-2">
        <p>Email: </p>
        <p>{user.email}</p>
      </div>
      <div className="flex gap-2">
        <p>ID: </p>
        <p>{user._id}</p>
      </div>
    </div>
  );
}
