"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import { api } from "@/convex/_generated/api";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useQuery, useMutation } from "convex/react";

import { toast } from "@/hooks/use-toast";

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export function AccountForm() {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateUser = useMutation(api.functions.updateUser);

  const defaultValues: Partial<AccountFormValues> = {
    name: `${viewerInfo && viewerInfo[0]?.name ? viewerInfo[0].name : ""}`,
  };

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: AccountFormValues) => {
    if (!viewerInfo || viewerInfo.length === 0) {
      console.error("Viewer information is missing.");
      toast({
        title: "Error",
        description: "User information is missing. Please try again later.",
      });
      return;
    }

    const dbUser = viewerInfo[0];
    const id = dbUser._id;

    updateUser({
      id,
      name: data.name,
      email: dbUser.email,
      image: dbUser.image,
      addresses: dbUser.addresses,
      updatedAt: new Date().toISOString(),
    })
      .then(() => {
        toast({
          title: "Changes Submitted Successfully",
        });
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        toast({
          title: "Error",
          description: "Failed to update user information. Please try again.",
        });
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Account</Button>
      </form>
    </Form>
  );
}
