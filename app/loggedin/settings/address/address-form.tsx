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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import countries from "@/data/countries";
import states from "@/data/us_states";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { updateAddress } from "@/convex/functions";

const addressFormSchema = z.object({
  country: z.string({ required_error: "Please select country." }),
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
  state: z.string({ required_error: "Please select state." }),
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
    })
    .optional(),
  isDefault: z.boolean(),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<AddressFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
  country: "US",
  state: "CA",
  isDefault: false,
};

export function AddressForm({
  className,
  type,
  index,
}: {
  className?: string;
  type: "add" | "edit";
  index?: number;
}) {
  const [open, setOpen] = useState(false);

  const viewerInfo = useQuery(api.functions.getUserInfo);
  const updateAddress = useMutation(api.functions.updateAddress);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues,
  });

  const removeDefaultAddress = (addresses: Array<any>) => {
    const updatedAddresses = addresses;
    for (let index = 0; index < updatedAddresses.length; index++) {
      updatedAddresses[index].isDefault = false;
    }
    return updatedAddresses;
  };

  function onSubmit(data: AddressFormValues) {
    if (!viewerInfo || viewerInfo.length === 0) {
      console.error("Viewer information is missing.");
      toast({
        title: "Error",
        description: "User information is missing. Please try again later.",
      });
      return;
    }

    let updatedAddresses = viewerInfo[0].addresses;
    const id = viewerInfo[0]._id;

    if (type == "add") {
      updatedAddresses?.push(data);
      if (data.isDefault && updatedAddresses) {
        for (let i = 0; i < updatedAddresses.length; i++) {
          updatedAddresses[i].isDefault = false;
        }
        updatedAddresses[updatedAddresses.length - 1].isDefault = true;
      }
    } else if (type == "edit") {
      if (updatedAddresses && index != undefined && index != null) {
        updatedAddresses[index] = data;
        if (data.isDefault && updatedAddresses) {
          for (let i = 0; i < updatedAddresses.length; i++) {
            updatedAddresses[i].isDefault = false;
          }
          updatedAddresses[index].isDefault = true;
        }
      }
    }

    updateAddress({
      id,
      addresses: updatedAddresses,
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

    setOpen(false);

    toast({ title: "Address updated successfully" });
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className={className}>
            {type == "add" ? "Add New Address" : "Edit"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {type == "add" ? "Add New Address" : "Edit Address"}
            </DialogTitle>
            <DialogDescription>Enter Address Details.</DialogDescription>
          </DialogHeader>
          <div className="max-h-[75vh] overflow-scroll">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Country</FormLabel>
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
                                ? countries.find(
                                    (countries) =>
                                      countries.value === field.value
                                  )?.label
                                : "Select Country"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput placeholder="Search country..." />
                            <CommandList>
                              <CommandEmpty>No countries found.</CommandEmpty>
                              <CommandGroup>
                                {countries.map(
                                  (country: {
                                    label: string;
                                    value: string;
                                  }) => (
                                    <CommandItem
                                      value={country.label}
                                      key={country.value}
                                      onSelect={() => {
                                        form.setValue("country", country.value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          country.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {country.label}
                                    </CommandItem>
                                  )
                                )}
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
                  name="fname"
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
                  name="lname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
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
                <FormField
                  control={form.control}
                  name="aptSuiteUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apt/Suite/Unit (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt/Suite/Unit (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues("country") === "US" ? (
                  <>
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>State</FormLabel>
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
                                    ? states.find(
                                        (state) => state.value === field.value
                                      )?.label
                                    : "Select State"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                              <Command>
                                <CommandInput placeholder="Search state..." />
                                <CommandList>
                                  <CommandEmpty>No states found.</CommandEmpty>
                                  <CommandGroup>
                                    {states.map(
                                      (state: {
                                        label: string;
                                        value: string;
                                      }) => (
                                        <CommandItem
                                          value={state.label}
                                          key={state.value}
                                          onSelect={() => {
                                            form.setValue("state", state.value);
                                          }}
                                        >
                                          <Check
                                            className={cn(
                                              "mr-2 h-4 w-4",
                                              state.value === field.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                          {state.label}
                                        </CommandItem>
                                      )
                                    )}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                ) : (
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="State" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Zip Code" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name (optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Company Name (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="isDefault"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          className="mx-2"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Set Address as Default</FormLabel>
                    </FormItem>
                  )}
                />
                {/* 
                <Button>
                  <DialogClose>Cancel</DialogClose>
                </Button> */}

                <Button className="mx-3" type="submit">
                  {type == "add" ? "Add address" : "Update address"}
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
