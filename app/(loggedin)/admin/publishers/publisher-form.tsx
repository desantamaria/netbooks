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
import { useMutation } from "convex/react";
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
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";

// Publisher schema validation using Zod
const publisherFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not be longer than 50 characters." }),
  description: z.string().optional(),
  website: z.string().url("Please enter a valid URL.").optional(),
});

type PublisherFormValues = z.infer<typeof publisherFormSchema>;

export function PublisherForm({
  className,
  type,
  id,
}: {
  className?: string;
  type: "add" | "edit";
  id?: Id<"publishers">;
}) {
  const [open, setOpen] = useState(false);

  const addPublisher = useMutation(api.functions.createPublisher);
  const updatePublisher = useMutation(api.functions.updatePublisher);

  const defaultValues: Partial<PublisherFormValues> = {};

  const form = useForm<PublisherFormValues>({
    resolver: zodResolver(publisherFormSchema),
    defaultValues,
  });

  async function onSubmit(data: PublisherFormValues) {
    if (type === "add") {
      try {
        await addPublisher({
          ...data,
        });
        toast({ title: "Publisher added successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to add the publisher." });
      }
    } else if (type === "edit" && id) {
      try {
        await updatePublisher({
          id,
          ...data,
        });
        toast({ title: "Publisher updated successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to update the publisher." });
      }
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={className}>
            {type == "add" ? "Add New Publisher" : "Edit"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type == "add" ? "Add New Publisher" : "Edit Publisher"}
            </DialogTitle>
            <DialogDescription>
              Enter Publisher Details.{" "}
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
                        <Input placeholder="Publisher's Name" {...field} />
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
                        <Input placeholder="Description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website</FormLabel>
                      <FormControl>
                        <Input placeholder="Website URL" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="mx-3" type="submit">
                  {type == "add" ? "Add Publisher" : "Update Publisher"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
