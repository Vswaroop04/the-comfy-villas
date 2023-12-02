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

const LoginPopup = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const formSchemaCreate = z.object({
    email: z.string(),
    password: z.string(),
    TandC: z.boolean().refine((value) => value, "You must agree to the T&C"),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isFetching, setIsFetching] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    setEmail(values.email);
    setPassword(values.password);
    setIsFetching(true);
    try {
      const resp = await login(values.email, values.password);
      console.log(resp);
      setIsFetching(false);
      console.log(resp);

      if (resp.message == "Login successful") {
        toast.success(resp.message);
        if (resp?.user?.role == "Admin") {
          setUser({
            ...resp.user,
            role: "Admin",
          });
          router.push("/managment", { scroll: false });
        } else {
          setUser({
            ...resp.user,
          });
          router.push("/resident", { scroll: false });
        }
        setOpen(false);
      } else {
        toast.error(resp.message);
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
            Welcome
          </h1>
          <h2 className="flex justify-center text-gray-600">
            Sign in to continue
          </h2>
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
                name="TandC"
                render={({ field }) => (
                  <FormItem className="my-4 flex w-full justify-start">
                    <div className="flex items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="ml-5">
                        Accept to our{" "}
                        <Link href="#" className="text-brand-links">
                          Terms and condition
                        </Link>
                        .
                      </FormLabel>
                    </div>
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
                    Login
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

export default LoginPopup;
