"use client";

/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/Button";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const addressFormSchema = z.object({
  country: z.string().min(1, {
    message: "Required",
  }),
  fname: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(30, {
      message: "First Name must not be longer than 30 characters.",
    }),
  lname: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  street: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters." })
    .max(30, {
      message: "Last Name must not be longer than 30 characters.",
    }),
  aptSuiteUnit: z
    .string()
    .max(30, {
      message: "Must not be longer than 30 characters.",
    })
    .optional(),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters." })
    .max(30, {
      message: "City must not be longer than 30 characters.",
    }),
  state: z
    .string()
    .min(2, { message: "City must be at least 2 characters." })
    .max(30, {
      message: "City must not be longer than 30 characters.",
    }),
  zipCode: z
    .string()
    .min(2, { message: "Zip Code must be at least 2 characters." })
    .max(10, {
      message: "Zip Code must not be longer than 10 characters.",
    }),
  phone: z
    .string()
    .min(2, { message: "Phone must be at least 2 characters." })
    .max(10, {
      message: "Phone must not be longer than 10 characters.",
    }),
  company: z
    .string()
    .min(2, { message: "Phone must be at least 2 characters." })
    .max(10, {
      message: "Phone must not be longer than 10 characters.",
    }),
  isDefualt: z.boolean(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AddressFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
};

export function AddressForm() {
  const viewerInfo = useQuery(api.functions.getUserInfo);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues,
  });

  function onSubmit(data: AddressFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Edit</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Address</AlertDialogTitle>
            <AlertDialogDescription>
              Enter Address Details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button className="mx-3" type="submit">
                Update address
              </Button>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
