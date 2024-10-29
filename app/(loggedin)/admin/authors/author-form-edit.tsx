"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { LoaderIcon, PlusIcon } from "lucide-react";

const authorFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not be longer than 50 characters." }),
  biography: z.string().optional(),
  birthDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Please enter the birth date in YYYY-MM-DD format."
    )
    .optional(),
  nationality: z
    .string()
    .max(50, { message: "Nationality must not exceed 50 characters." })
    .optional(),
  photoUrl: z.string().url("Please enter a valid URL.").optional(),
  websiteUrl: z.string().url("Please enter a valid URL.").optional(),
});

type AuthorFormValues = z.infer<typeof authorFormSchema>;

export function AuthorEditForm({
  className,
  type,
  id,
}: {
  className?: string;
  type: "add" | "edit";
  id: Id<"authors">;
}) {
  const [open, setOpen] = useState(false);

  const addAuthor = useMutation(api.functions.createAuthor);
  const updateAuthor = useMutation(api.functions.updateAuthor);

  const defaultValues: Partial<AuthorFormValues> = {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachment, setAttachment] = useState<Id<"_storage">>();
  const [file, setFile] = useState<File>();
  const [isUploading, setIsUploading] = useState(false);
  const generateUploadUrl = useMutation(api.functions.file.generateUploadUrl);

  const author = useQuery(api.functions.getAuthor, { id: id });

  // Update default values when viewerInfo changes
  useEffect(() => {
    if (author) {
      form.reset({
        name: author.name,
        biography: author.biography,
        birthDate: author.birthDate,
        nationality: author.nationality,
        photoUrl: attachment,
        websiteUrl: author.websiteUrl,
      });
    }
  }, [author]);

  const form = useForm<AuthorFormValues>({
    resolver: zodResolver(authorFormSchema),
    defaultValues,
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setIsUploading(true);
    const url = await generateUploadUrl();
    const res = await fetch(url, {
      method: "POST",
      body: file,
    });
    const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
    setAttachment(storageId);
    setIsUploading(false);
  };

  async function onSubmit(data: AuthorFormValues) {
    if (type === "add") {
      try {
        await addAuthor(data);
        toast({ title: "Author added successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to add the author." });
      }
    } else if (type === "edit" && id) {
      try {
        await updateAuthor({
          id: id,
          name: data.name,
          nationality: data.nationality,
          image: attachment,
          websiteUrl: data.websiteUrl,
        });
        toast({ title: "Author updated successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to update the author." });
      }
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={className}>
            {type == "add" ? "Add New Author" : "Edit"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type == "add" ? "Add New Author" : "Edit Author"}
            </DialogTitle>
            <DialogDescription>
              Enter Author Details.{" "}
              <span className="text-red-500">* Required</span>
            </DialogDescription>
          </DialogHeader>
          <div className="max-h-[75vh] overflow-scroll">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Author's Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="biography"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Biography</FormLabel>
                      <FormControl>
                        <Input placeholder="Biography" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Date (YYYY-MM-DD)</FormLabel>
                      <FormControl>
                        <Input placeholder="Birth Date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nationality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nationality</FormLabel>
                      <FormControl>
                        <Input placeholder="Nationality" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Add Image
                    <PlusIcon />
                    <span className="sr-only">Add Image</span>
                  </Button>
                  {isUploading && (
                    <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                      <LoaderIcon className="size-8 animate-spin" />
                    </div>
                  )}
                  {!isUploading && file && <p>{file.name}</p>}
                </div>
                <FormField
                  control={form.control}
                  name="websiteUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mx-3" type="submit">
                  {type == "add" ? "Add author" : "Update author"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileUpload}
      />
    </>
  );
}
