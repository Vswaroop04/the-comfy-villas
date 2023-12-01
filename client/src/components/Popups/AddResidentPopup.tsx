"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import login from "@/lib/fetchers/auth/login";
import { toast } from "sonner";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import addResident from "@/lib/fetchers/residents/addResident";
import { getAllListings } from "@/lib/fetchers/listing/getAllListings";

const addResidentPopup = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [listings, setListings] = useState([]); // State to store listings

  useEffect(() => {
    const fetchListings = async () => {
      const fetchedListings: any = await getAllListings();
      setListings(fetchedListings.listings);
    };
    fetchListings();
  }, []);

  const formSchemaCreate = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    listingId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      listingId: "",
    },
  });

  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    setEmail(values.email);
    setPassword(values.password);
    setIsFetching(true);
    try {
      const resp = await addResident({
        email: values.email,
        password: values.password,
        name: values.name,
        phone: values.phone,
        listingId: values.listingId,
      });
      console.log(resp);
      setIsFetching(false);
      console.log(resp);
      toast.message(resp.message);

      if (resp.message == "Resident User Created Successfully") {
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  }

  const { setUser } = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="flex h-auto min-h-fit w-4/5 max-w-xl flex-col rounded-3xl p-5 px-8 md:w-full bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="flex flex-col">
          <h1 className="flex justify-center text-3xl font-semibold tracking-tight text-[#580d83]">
            Add Resident
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 flex w-full flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-grey-600">Name </FormLabel>
                    <span className="flex items-center gap-2 border-2 p-2">
                      <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                        <Input
                          type="name"
                          placeholder="Name"
                          className="border-0 outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-grey-600">Phone </FormLabel>
                    <span className="flex items-center gap-2 border-2 p-2">
                      <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                        <Input
                          type="phone"
                          placeholder="Phone"
                          className="border-0 outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-grey-600">Email </FormLabel>
                    <span className="flex items-center gap-2 border-2 p-2">
                      <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                        <Input
                          type="email"
                          placeholder="Email"
                          className="border-0 outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-grey-600">Password</FormLabel>
                    <span className="flex items-center gap-2 border-2 p-2">
                      <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                        <Input
                          type="password"
                          placeholder="Password "
                          className="border-0 outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                    </span>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="listingId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-grey-600">Listing</FormLabel>
                    <select
                      className="w-full border-2 p-2 rounded-md"
                      {...field}
                    >
                      {listings?.map((listing: any) => (
                        <option key={listing.id} value={listing.id}>
                          {listing.name}
                        </option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isFetching ? (
                <div className="flex h-12 w-full items-center justify-center">
                  <Loader className="animate-spin" />
                </div>
              ) : (
                <div className="flex h-12 w-full items-center justify-center">
                  <Button
                    type="submit"
                    className="w-full bg-[#580d83] text-[#FFFFFF]"
                    variant={"outline"}
                  >
                    Add Resident
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default addResidentPopup;
