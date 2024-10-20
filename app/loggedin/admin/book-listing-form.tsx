"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { X } from "lucide-react";

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
import { useEffect, useState } from "react";
import { GenericId } from "convex/values";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

const categories: { label: string; value: GenericId<"categories"> }[] = [];

const publishers: { label: string; value: GenericId<"publishers"> }[] = [];

const authors: { label: string; value: GenericId<"authors"> }[] = [];

const bookFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }), // Custom error for title
  isbn: z
    .string()
    .min(1, { message: "ISBN is required." }) // Custom error for ISBN
    .length(13, { message: "ISBN must be 13 characters long." }), // Length validation with custom error
  authorIds: z
    .array(z.custom<GenericId<"authors">>())
    .min(1, { message: "At least one author is required." }), // At least one author is required
  categories: z.array(
    z.object({
      id: z.custom<GenericId<"categories">>(),
      name: z.string().min(1, { message: "Category name is required." }),
    })
  ),
  publisherIds: z
    .array(z.custom<GenericId<"publishers">>())
    .min(1, { message: "At least one publisher is required." }), // At least one publisher is required
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long." }), // Minimum length with custom error
  price: z.number().positive({ message: "Price must be a positive number." }), // Positive number check with custom message
  discount: z
    .number()
    .min(0, { message: "Discount cannot be negative." })
    .max(100, { message: "Discount cannot be more than 100%." })
    .optional(), // Custom error for discount field
  stockQuantity: z
    .number()
    .min(0, { message: "Stock quantity cannot be negative." }), // Custom error for stock quantity
  publicationDate: z
    .string()
    .min(1, { message: "Publication date is required." }), // Custom error for publication date
  language: z.string({
    required_error: "Please select a language.",
  }),
  format: z.enum(["hardcover", "paperback", "ebook", "audiobook"], {
    errorMap: () => ({ message: "Please select a valid format." }), // Custom error for format selection
  }),
  pageCount: z
    .number()
    .positive({ message: "Page count must be a positive number." })
    .optional(), // Custom error for page count
  featured: z.boolean(), // No custom error needed for boolean field
  file: z
    .string()
    .refine((val) => val.endsWith(".mp3") || val.endsWith(".pdf"), {
      message: "File must be an MP3 or PDF", // Custom error for file validation
    })
    .optional(),
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

  const authorsList = useQuery(api.functions.listAuthors);
  const publishersList = useQuery(api.functions.listPublishers);
  const categoriesList = useQuery(api.functions.listCategories);

  const [authorsReady, setAuthorsReady] = useState(false);
  const [publishersReady, setPublishersReady] = useState(false);
  const [categoriesReady, setCategoriesReady] = useState(false);

  const [selectedAuthors, setSelectedAuthors] = useState<
    { label: string; value: GenericId<"authors"> }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<
    { id: GenericId<"categories">; name: string }[]
  >([]);
  const [selectedPublishers, setSelectedPublishers] = useState<
    { label: string; value: GenericId<"publishers"> }[]
  >([]);

  const defaultValues: Partial<BookFormValues> = {
    title: "",
    isbn: "",
    authorIds: [],
    categories: [],
    publisherIds: [],
    description: "",
    price: 0,
    stockQuantity: 0,
    publicationDate: "",
    language: "",
    format: "paperback",
    pageCount: 0,
    featured: false,
  };

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (categoriesList) {
      categories.length = 0;
      categoriesList.forEach((category) => {
        categories.push({ label: category.name, value: category._id });
      });
      setCategoriesReady(true);
    }
  }, [categoriesList]);

  useEffect(() => {
    if (authorsList) {
      authors.length = 0;
      authorsList.forEach((author) => {
        authors.push({ label: author.name, value: author._id });
      });
      setAuthorsReady(true);
    }
  }, [authorsList]);

  useEffect(() => {
    if (publishersList) {
      publishers.length = 0;
      publishersList.forEach((publisher) => {
        publishers.push({ label: publisher.name, value: publisher._id });
      });
      setPublishersReady(true);
    }
  }, [publishersList]);

  // Update your handlers to properly set form values
  const updateAuthorIds = ({
    label,
    value,
  }: {
    label: string;
    value: GenericId<"authors">;
  }) => {
    const currentAuthors = form.getValues("authorIds") || [];
    if (!currentAuthors.includes(value)) {
      setSelectedAuthors((prev) => [...prev, { label, value }]);
      form.setValue("authorIds", [...currentAuthors, value], {
        shouldValidate: true,
      });
    }
  };

  const updatePublisherIds = ({
    label,
    value,
  }: {
    label: string;
    value: GenericId<"publishers">;
  }) => {
    const currentPublishers = form.getValues("publisherIds") || [];
    if (!currentPublishers.includes(value)) {
      setSelectedPublishers((prev) => [...prev, { label, value }]);
      form.setValue("publisherIds", [...currentPublishers, value], {
        shouldValidate: true,
      });
    }
  };

  const updateCategoryIds = ({
    label,
    value,
  }: {
    label: string;
    value: GenericId<"categories">;
  }) => {
    const currentCategories = form.getValues("categories") || [];
    if (!currentCategories.some((category) => category.id === value)) {
      const newCategory = { id: value, name: label };
      setSelectedCategories((prev) => [...prev, newCategory]);
      form.setValue("categories", [...currentCategories, newCategory], {
        shouldValidate: true,
      });
    }
  };

  async function onSubmit(data: BookFormValues) {
    try {
      // Add basic form validation
      if (!data.authorIds.length) {
        form.setError("authorIds", {
          type: "manual",
          message: "At least one author is required",
        });
        return;
      }

      if (!data.publisherIds.length) {
        form.setError("publisherIds", {
          type: "manual",
          message: "At least one publisher is required",
        });
        return;
      }

      // Log the data being submitted
      console.log("Submitting form data:", data);

      if (type === "add") {
        // Add loading state handling
        const result = await addBook(data);
        console.log("Book added successfully:", result);

        toast({
          title: "Success",
          description: "Book added successfully",
        });

        // Reset form after successful submission
        form.reset(defaultValues);
        setSelectedAuthors([]);
        setSelectedCategories([]);
        setSelectedPublishers([]);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to add book. Please try again.",
        variant: "destructive",
      });
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
                <FormLabel>Book Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authorIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Author(s)</FormLabel>
                <div className="flex items-center gap-2">
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
                          Select Author
                          {/* {field.value
                          ? authors.find(
                              (author) => author.value === field.value
                            )?.label
                          : "Select author"} */}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search author..." />
                        <CommandList>
                          <CommandEmpty>No author found.</CommandEmpty>
                          <CommandGroup>
                            {authorsReady &&
                              authors.map((author) => (
                                <CommandItem
                                  className="cursor-pointer"
                                  value={author.label}
                                  key={author.value}
                                  onSelect={() => {
                                    updateAuthorIds(author);
                                  }}
                                >
                                  {author.label}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Card className="flex items-center gap-2">
                    {selectedAuthors.map((author) => (
                      <Badge className="flex items-center gap-2">
                        {author.label}
                        <X
                          size={20}
                          className="cursor-pointer p-1 rounded-full"
                        />
                      </Badge>
                    ))}
                  </Card>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisherIds"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Publisher(s)</FormLabel>
                <div className="flex items-center gap-2">
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
                          Select Publisher
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search publisher..." />
                        <CommandList>
                          <CommandEmpty>No publisher found.</CommandEmpty>
                          <CommandGroup>
                            {publishersReady &&
                              publishers.map((publisher) => (
                                <CommandItem
                                  className="cursor-pointer"
                                  value={publisher.label}
                                  key={publisher.value}
                                  onSelect={() => {
                                    updatePublisherIds(publisher);
                                  }}
                                >
                                  {publisher.label}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Card className="flex items-center gap-2">
                    {selectedPublishers.map((publisher) => (
                      <Badge className="flex items-center gap-2">
                        {publisher.label}
                        <X
                          size={20}
                          className="cursor-pointer p-1 rounded-full"
                        />
                      </Badge>
                    ))}
                  </Card>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category(s)</FormLabel>
                <div className="flex items-center gap-2">
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
                          Select Category
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categoriesReady &&
                              categories.map((category) => (
                                <CommandItem
                                  className="cursor-pointer"
                                  value={category.label}
                                  key={category.value}
                                  onSelect={() => {
                                    updateCategoryIds(category);
                                  }}
                                >
                                  {category.label}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Card className="flex items-center gap-2">
                    {selectedCategories.map((category) => (
                      <Badge className="flex items-center gap-2">
                        {category.name}
                        <X
                          size={20}
                          className="cursor-pointer p-1 rounded-full"
                        />
                      </Badge>
                    ))}
                  </Card>
                </div>
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
                  <Input
                    placeholder="Price"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? "" : numValue);
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? 0 : numValue);
                    }}
                  />
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
                  <Input
                    placeholder="Stock Quantity"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? "" : numValue);
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? 0 : numValue);
                    }}
                  />
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

          {form.getValues("format") === "ebook" ||
          form.getValues("format") === "audiobook" ? (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Book PDF</FormLabel>
                  <FormControl>
                    <Input id="book-pdf" type="file" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <></>
          )}
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
                  <Input
                    placeholder="Page Count"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? "" : numValue);
                    }}
                    onBlur={(e) => {
                      const value = e.target.value;
                      const numValue = parseFloat(value);
                      field.onChange(isNaN(numValue) ? 0 : numValue);
                    }}
                  />
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
