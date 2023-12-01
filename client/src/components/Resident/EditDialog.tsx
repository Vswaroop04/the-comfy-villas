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
  ratings,
  listingId,
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ratings: any;
  listingId: string;
}) {
  const formSchemaCreate = z.object({
    amenitiesRatings: z.number().optional(),
    managementRatings: z.number().optional(),
    serviceRatings: z.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchemaCreate>>({
    resolver: zodResolver(formSchemaCreate),
    defaultValues: {
      amenitiesRatings: ratings[0]?.amenitiesRatings,
      managementRatings: ratings[0]?.managementRatings,
      serviceRatings: ratings[0]?.serviceRatings,
    },
  });
  const [isFetching, setIsFetching] = useState(false);
  const [amenitiesRatings, setAmenities] = useState(
    ratings[0]?.amenitiesRatings
  );
  const [managementRatings, setManagementRatings] = useState(
    ratings[0]?.managementRatings
  );
  const [serviceRatings, setServiceRatings] = useState(
    ratings[0]?.serviceRatings
  );

  const handleAmenitiesStarClick = (value: any) => {
    console.log("aahsfbjabc");
    console.log(value);
    setAmenities(value);
  };
  const handleManagementStarClick = (value: any) => {
    setManagementRatings(value);
  };
  const handleServiceStarClick = (value: any) => {
    setServiceRatings(value);
  };

  async function onSubmit(values: z.infer<typeof formSchemaCreate>) {
    try {
      setIsFetching(true);
      const resp = await feedbackResident({
        listingId,
        amenitiesRatings,
        managementRatings,
        serviceRatings,
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
                name="amenitiesRatings"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-center items-center py-4">
                    <FormLabel className="text-grey-600 mr-3 pt-1">
                      Amenities Rating{" "}
                    </FormLabel>
                    <StarRating
                      maxStars={5}
                      onStarClick={handleAmenitiesStarClick}
                      className="mx-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="managementRatings"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-center items-center py-4">
                    <FormLabel className="text-grey-600 mr-3 pt-1">
                      Managment Rating{" "}
                    </FormLabel>
                    <StarRating
                      maxStars={5}
                      onStarClick={handleManagementStarClick}
                      className="mx-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serviceRatings"
                render={({ field }) => (
                  <FormItem className="w-full flex justify-center items-center py-4">
                    <FormLabel className="text-grey-600 mr-3 pt-1">
                      Service Rating{" "}
                    </FormLabel>
                    <StarRating
                      maxStars={5}
                      onStarClick={handleServiceStarClick}
                      className="mx-2"
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
