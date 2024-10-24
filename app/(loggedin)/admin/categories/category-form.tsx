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
import { useEffect, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must not be longer than 50 characters." }),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export function CategoryForm({
  className,
  type,
  id,
}: {
  className?: string;
  type: "add" | "edit";
  id?: Id<"categories">;
}) {
  const [open, setOpen] = useState(false);

  const addCategory = useMutation(api.functions.createCategory);
  const updateCategory = useMutation(api.functions.updateCategory);

  const defaultValues: Partial<CategoryFormValues> = {};

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  async function onSubmit(data: CategoryFormValues) {
    if (type === "add") {
      try {
        await addCategory(data);
        toast({ title: "Category added successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to add the category." });
      }
    } else if (type === "edit" && id) {
      try {
        await updateCategory({
          id: id,
          name: data.name,
        });
        toast({ title: "Category updated successfully!" });
        setOpen(false);
      } catch (error) {
        toast({ title: "Failed to update the category." });
      }
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={className}>
            {type == "add" ? "Add New Category" : "Edit"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type == "add" ? "Add New Category" : "Edit Category"}
            </DialogTitle>
            <DialogDescription>
              Enter Category Details.{" "}
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
                        <Input placeholder="Category Name" {...field} />
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
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Add a description for the category."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="mx-3" type="submit">
                  {type == "add" ? "Add category" : "Update category"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
