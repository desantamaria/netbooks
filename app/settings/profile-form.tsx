"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */

import { api } from "@/convex/_generated/api";

// import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
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
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

import { useQuery, useMutation } from "convex/react";

import { toast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  //   email: z
  //     .string({
  //       required_error: "Please select an email to display.",
  //     })
  //     .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateUser = useMutation(api.functions.updateUser);

  //   console.log(viewerInfo);

  // This can come from your database or API.
  const defaultValues: Partial<ProfileFormValues> = {
    name: `${viewerInfo && viewerInfo[0]?.name ? viewerInfo[0].name : ""}`,
    // email: `${viewerInfo && viewerInfo[0]?.email ? viewerInfo[0].email : ""}`,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  //   const { fields, append } = useFieldArray({
  //     name: "urls",
  //     control: form.control,
  //   });

  const onSubmit = (data: ProfileFormValues) => {
    if (!viewerInfo || viewerInfo.length === 0) {
      console.error("Viewer information is missing.");
      toast({
        title: "Error",
        description: "User information is missing. Please try again later.",
      });
      return; // Stop the function if viewerInfo is undefined
    }

    const dbUser = viewerInfo[0]; // Safely access the first element
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
              {/* <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        {/* <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    URLs
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add URL
          </Button>
        </div> */}
        <Button type="submit">Update Account</Button>
      </form>
    </Form>
  );
}
