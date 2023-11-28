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
import feedbackResident from "@/lib/fetchers/residents/feedback";
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
import { TFeedback } from "@/types/Resident";
import StarRating from "./starRating";

export default function EditDialog({
  isOpen,
  setOpen,
  reviews,
  listingId,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviews: any;
  listingId: string;
}) {
  const formSchemaCreate = z.object({
    review: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      review: reviews[0].review,
    },
  });
  const [isFetching, setIsFetching] = useState(false);
  const [review, setReview] = useState(reviews[0].review);

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    try {
      setIsFetching(true);
      const resp = await feedbackResident({
        listingId,
        review,
      });
      console.log(resp);
      setIsFetching(false);
      toast.message(resp.message);
      setOpen(false);
      window.location.reload();
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
        <div className="flex flex-col">
          <h2 className="flex justify-center text-gray-600">Ratings</h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-5 flex w-full flex-col gap-2"
            >
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem className="w-full  py-4">
                    <FormLabel className="text-grey-600 mr-3 pt-1">
                      Review{" "}
                    </FormLabel>
                    <textarea
                      name="review"
                      defaultValue={review}
                      onChange={(event) => {
                        setReview(event.target.value);
                      }}
                      className="w-full p-4 border rounded-lg"
                      placeholder="Write your review"
                    />
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
                    Submit
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
