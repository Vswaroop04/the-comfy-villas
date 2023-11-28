"use client";
import userAtom from "@/store/User";
import { useAtom } from "jotai";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import { getAllListings } from "@/lib/fetchers/listing/getAllListings";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Layout from "./PageLayout";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import MyListing from "./Listings";

export default function Page() {
  const router = useRouter();

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["resident"],
    queryFn: async () => {
      const user = await isLoggedIn();
      toast.loading("Loading User Data");
      if (user.user?.role != "Admin") {
        toast.error("You Are Not Manangment!!!");
        setTimeout(() => {
          router.push("/");
        }, 100);
        return;
      }

      try {
        const data = await getAllListings();
        toast.success(`Listings has been fetched successfully`);
        return data;
      } catch (error) {
        toast.error("Error loading resident data");
        throw error;
      }
    },
  });
  return (
    <div>
      <span className="container my-4 flex text-brand-gray">
        <Link href={`/managment`} className="underline">
          Managment
        </Link>
        <span className="flex">
          <ChevronRight />
          <span className="">Listing</span>
        </span>
      </span>
      <Layout>
        <div className="flex justify-between">
          <div className="text-[18px] font-semibold lg:text-[28px]">
            Listings
          </div>
          <MyListing Listings={searchResults?.listings} />
        </div>
      </Layout>
    </div>
  );
}
