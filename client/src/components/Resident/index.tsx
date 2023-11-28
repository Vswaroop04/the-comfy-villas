"use client";
import getResident from "@/lib/fetchers/residents/getResident";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import { useQuery } from "@tanstack/react-query";
import useUser from "@/hooks/useUser";
import Router, { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader, SmilePlus } from "lucide-react";
import SimpleCarousel from "../ListingPage/CarouselComponent";
import RatingComponent from "./overviewRatingsReviews";
import { useEffect } from "react";

export default function Resident() {
  const router = useRouter();
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["resident"],
    queryFn: async () => {
      const user = await isLoggedIn();
      toast.loading("Loading User Data");
      if (user.user?.role == "Admin") {
        toast.error("You Are Management!!!");
        setTimeout(() => {
          router.push("/managment");
        }, 500);
        return;
      }

      try {
        const data = await getResident();
        toast.success(`${data.user.name}'s data has been fetched successfully`);
        return data;
      } catch (error) {
        toast.error("Error loading resident data");
        throw error;
      }
    },
  });

  return (
    <div className="mx-10 border p-4">
      {searchResults?.user && (
        <>
          <div className="flex">
            <h1 className="text-3xl font-bold">Hi ,</h1>
            <p className="text-3xl font-serif">{searchResults.user.name} </p>
            <p className="text-4xl p-2 ">
              {" "}
              <SmilePlus />{" "}
            </p>
          </div>
          <div className="ml-28">
            <SimpleCarousel
              images={searchResults.user.listing.images}
              height="h-[55vh]"
            />
          </div>
          <RatingComponent userData={searchResults?.user} />
        </>
      )}
    </div>
  );
}
