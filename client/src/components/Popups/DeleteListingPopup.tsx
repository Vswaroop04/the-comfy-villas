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
import { Trash2 } from "lucide-react";
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
import { deleteListing } from "@/lib/fetchers/listing/deleteListing";
import { TAddListingResponse } from "@/types/Listing";

const deleteListingPopup = ({
  isOpen,
  setOpen,
  listingId,
  setFilteredListing
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  listingId: string;
  setFilteredListing: React.Dispatch<
    React.SetStateAction<TAddListingResponse[]>
  >;
}) => {
  const router = useRouter();
  console.log(listingId);
  async function handleDeleteListing() {
    try {
      const resp = await deleteListing({ id: listingId });
      toast.message(resp.message);
      setTimeout(() => {
        if (resp.message == "Listing deleted successfully") {
          setFilteredListing((currentListings) =>
            currentListings.filter(
              (listing) => listing.id !== listingId
            )
          );
        }
      }, 700);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  }

  const { setUser } = useUser();

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent
        className="flex h-auto min-h-fit w-4/5 max-w-xl flex-col rounded-3xl p-5 px-8 md:w-full bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div className="leading-8">
          <Trash2 className="m-auto text-red-600" />
          <div className="text-[16px] text-red-600 lg:text-[24px]">
            {" "}
            Delete Listing?
          </div>
          <div className="text-[14px] lg:text-[16px]">
            Are you sure you want to delete this listing?
          </div>
        </div>
        <div className="mt-2 flex w-full justify-between">
          <Button
            variant={"outline"}
            className="w-4/12 rounded-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            variant={"default"}
            className="w-4/12 rounded-full"
            onClick={handleDeleteListing}
          >
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default deleteListingPopup;
