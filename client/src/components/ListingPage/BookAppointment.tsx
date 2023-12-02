import bookAppointment from "@/lib/fetchers/appointment/bookAppointment";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";

export default function BookAppointment({
  isOpen,
  setOpen,
  listingId,
  listingName,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: string;
  listingName: string;
}) {
  async function bookAppointmentSubmit(
    name: string,
    email: string,
    phone: string
  ) {}

  const formSchemaCreate = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    setEmail(values.email);
    setPhone(values.phone);
    setName(values.name);
    setIsFetching(true);
    try {
      const resp = await bookAppointment({
        email: values.email,
        name: values.name,
        phone: values.phone,
        listingId,
      });
      setIsFetching(false);
      if (resp.message == "Appointment Booked Succesfully") {
        toast.success(resp.message);  
      }
      else {
        toast.error(resp.message)
      }
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
    setIsFetching(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="flex h-auto min-h-fit w-4/5 max-w-xl flex-col rounded-3xl p-5 px-8 md:w-full bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
          Book Appointment
        </h2>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-600">{listingName}</div>
          </div>
          <a
            href="https://maps.google.com/?q=Montreal,Canada"
            className="text-indigo-600 hover:text-indigo-500 transition duration-300"
          >
            View map →
          </a>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 flex w-full flex-col gap-2"
          >
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-grey-600">Name</FormLabel>
                  <span className="flex items-center gap-2 border-2 p-2">
                    <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                      <Input
                        type="name"
                        placeholder="Name "
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
                  <FormLabel className="text-grey-600">Phone</FormLabel>

                  <span className="flex items-center gap-2 border-2 p-2">
                    <FormControl className="border-0 outline-none focus:border-0 focus:outline-0">
                      <Input
                        type="phone"
                        placeholder="Phone "
                        className="border-0 outline-none focus-visible:ring-0"
                        {...field}
                      />
                    </FormControl>
                  </span>
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
                  Book
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
