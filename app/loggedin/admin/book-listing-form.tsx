"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CaretSortIcon } from "@radix-ui/react-icons";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

const format = [
  { label: "Hardcover", value: "hardcover" },
  { label: "Paperback", value: "paperback" },
  { label: "Ebook", value: "ebook" },
  { label: "Audiobook", value: "audiobook" },
] as const;

const bookFormSchema = z.object({
  title: z.string(),
  isbn: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.optional(z.number()),
  stockQuantity: z.number(),
  publicationDate: z.string(),
  language: z.string({
    required_error: "Please select a language.",
  }),
  format: z.enum(["hardcover", "paperback", "ebook", "audiobook"]),
  pageCount: z.optional(z.number()),
  featured: z.boolean(),
});

type BookFormValues = z.infer<typeof bookFormSchema>;

export function BookForm({
  type,
  index,
}: {
  type: "add" | "edit";
  index?: number;
}) {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const addBook = useMutation(api.functions.createBook);

  const defaultValues: Partial<BookFormValues> = {};

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BookFormValues) {
    if (type === "add") {
      try {
        const authorId: Id<"authors"> =
          "m17bz91pqyj9y3t4g856r1jfb572hy17" as Id<"authors">;
        const categoryID: Id<"categories"> =
          "kh7a632jj52vpyb5nxaek0010972jg7r" as Id<"categories">;
        const categoryName = "Mystery";

        const publisherId: Id<"publishers"> =
          "ks77jk0d7gaw1eg4fmfrm0a9bd72kkxg" as Id<"publishers">;

        await addBook({
          authorIds: [authorId],
          category: [{ id: categoryID, name: categoryName }],
          publisherId: publisherId,
          ...data,
        });
        toast({ title: "Book added successfully!" });
      } catch (error) {
        toast({ title: "Failed to add the book." });
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="ISBN" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock Quantity</FormLabel>
                <FormControl>
                  <Input placeholder="Stock Quantity" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publicationDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Date</FormLabel>
                <FormControl>
                  <Input placeholder="Publication Date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="format"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Format</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? format.find(
                              (format) => format.value === field.value
                            )?.label
                          : "Select format"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search format..." />
                      <CommandList>
                        <CommandEmpty>No format found.</CommandEmpty>
                        <CommandGroup>
                          {format.map((format) => (
                            <CommandItem
                              value={format.label}
                              key={format.value}
                              onSelect={() => {
                                form.setValue("format", format.value);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  format.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {format.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language.value === field.value
                            )?.label
                          : "Select language"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandList>
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language.label}
                              key={language.value}
                              onSelect={() => {
                                form.setValue("language", language.value);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input placeholder="Page Count" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mx-3" type="submit">
            {type == "add" ? "Add book" : "Update book"}
          </Button>
        </form>
      </Form>
    </>
  );
}
