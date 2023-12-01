"use client";
import userAtom from "@/store/User";
import { useAtom } from "jotai";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import { getAllListings } from "@/lib/fetchers/listing/getAllListings";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import Layout from "./PageLayout";
import { ChevronRight, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import MyListing from "./Listings";
import { useState, useEffect } from "react";
import { TAddListingResponse } from "@/types/Listing";

export default function Page() {
  const router = useRouter();
  const path = usePathname();

  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState<TAddListingResponse[]>([]);
  const [isAddPopup, setIsAddPopup] = useState(false);

  const [filteredList, setFilteredListings] = useState<TAddListingResponse[]>(
    []
  );

  useEffect(() => {
    const filteredListings = searchTerm
      ? listings.filter((listing) =>
          listing.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : listings;
    setFilteredListings(filteredListings);
  }, [searchTerm]);

  const {
    data: searchResults,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["resident", path],
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
        if (data.message == "All Listings Fetched successfully") {
          toast.success(`Listings has been fetched successfully`);
        }
        setListings(data.listings);
        setFilteredListings(data.listings);
        return data;
      } catch (error) {
        toast.error("Error loading resident data");
        throw error;
      }
    },
    staleTime: 0, // Always consider data stale
    cacheTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
  });
  useEffect(() => {
    refetch();
  }, [path, refetch]);

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
        <div className="container my-4">
          {/* Listings Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-[18px] font-semibold lg:text-[28px]">
              Listings
            </h1>
            {/* Other elements if needed */}
          </div>
          {/* Search Bar */}
          <div className="my-4 flex">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              // onChange handler will be passed down to MyListing component
            />
            <button
              className="flex items-center bg-orange-400 px-4 py-2 rounded-lg text-lg text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              onClick={() => {
                setIsAddPopup(true);
              }}
            >
              <PlusCircleIcon className="h-6 w-6" />
              <span className="ml-2">Add</span>
              <span className="ml-2">Listing</span>
            </button>
          </div>

          {/* Listings Component */}
          <MyListing
            Listings={filteredList}
            setFilteredListing={setFilteredListings}
            setIsAddPopup={setIsAddPopup}
            isAddPopup={isAddPopup}
          />
        </div>
      </Layout>
    </div>
  );
}
