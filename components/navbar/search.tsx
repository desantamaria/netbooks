import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { Command, CommandInput, CommandItem, CommandList } from "../ui/command";

export default function Search() {
  const books = useQuery(api.functions.listBooks);
  const [bookList, setBookList] = useState<{ value: string; label: string }[]>(
    []
  );

  useEffect(() => {
    const newBookList = books?.map((book) => {
      return { value: book.title, label: book.title };
    });

    if (newBookList !== undefined) {
      setBookList(newBookList);
    }
  }, [books]);
  return (
    <div className="max-w-xl w-full px-4">
      <CommandSearch books={bookList} />
    </div>
  );
}

interface IBookProps {
  books: { value: string; label: string }[];
}

export function CommandSearch({ books }: IBookProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleValueChange = (value: string) => {
    setInputValue(value);
    setOpen(!!value);
  };

  const filteredSearch = Array.isArray(books)
    ? books.filter((book) =>
        book.label.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];
  return (
    <Command>
      <CommandInput
        placeholder="Search for a book..."
        onValueChange={handleValueChange}
      />
      {
        <CommandList className="absolute bg-background border rounded-sm mt-8 transform translate-y-1 ">
          {open &&
            filteredSearch.length > 0 &&
            filteredSearch.map((search) => (
              <CommandItem
                key={search.value}
                value={search.value}
                className="w-full"
              >
                {search.label}
              </CommandItem>
            ))}
        </CommandList>
      }
    </Command>
  );
}
