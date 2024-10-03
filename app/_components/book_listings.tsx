import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

export function BookListings() {
  const books = useQuery(api.functions.listBooks);
  return (
    <ul className="space-y-2">
      {books?.map(({ _id, title, price }) => (
        <Book key={_id} title={title} price={price} />
      ))}
    </ul>
  );
}

function Book({ title, price }: { title: string; price: number }) {
  return (
    <li className="flex gap-2 border rounded p-2 items-center w-full">
      <p>{title}</p>
      <p>{price}</p>
    </li>
  );
}
