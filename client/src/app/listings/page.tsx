"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";
import filterAtom from "@/store/filterAtom";
import { useState } from "react";
import getFilteredListings from "@/lib/fetchers/listing/filter";
import ProductSkeletonCard from "@/components/Listings/ProductSkeletonCard";
import CardComponent from "@/components/Home/CardComponent";
import { useAtom } from "jotai";
import Link from "next/link";
import { useHydrateAtoms } from "jotai/utils";
import { useIntersection } from "react-use";
import HeaderListings from "@/components/Listings/HeaderListings";
import SearchComponent from "@/components/Listings/SearchBar";
import { toast } from "sonner";

export default function Listings() {
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [openLoadingState, setOpenLoadingState] = useState(false);
  const [filter, setFilterData] = useAtom(filterAtom);

  const fetchLisitngs = async ({ pageParam = 1 }) => {
    const filter = {
      limit: 12,
      page: pageParam,
    };
    const res = await getFilteredListings(filter);
    return res.data;
  };
  const {
    data: listings,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["listings", filter],
    queryFn: ({ pageParam }) =>
      getFilteredListings({
        ...filter,
        limit: 10,
        page: pageParam || 1,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentRecordCount = allPages.length * 10;
      if (currentRecordCount >= (allPages[0]?.data?.totalListingsCount || 0)) {
        return undefined;
      }
      const currentPage = allPages.length;
      return currentPage + 1;
    },
  });

  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });
  const placeholderImageUrl =
    "https://res.cloudinary.com/dpbuff0qs/image/upload/v1700000971/thumbnails/eepadzv1wozeg8rcpygh.jpg";

  useEffect(() => {
    if (intersection && intersection.isIntersecting && hasNextPage) {
      toast.loading("Villas Are Loading");
      fetchNextPage();
    }
  }, [intersection, fetchNextPage, hasNextPage]);
  return (
    <div className="mt-44 ml-28">
      <SearchComponent />
      <HeaderListings />
      {listings && listings.pages[0]?.data?.listings?.length > 0 ? (
        <div className=" m-4 grid grid-cols-3 -mx-1.5 py-3">
          {listings.pages[0]?.data?.listings?.length > 0 &&
            listings.pages?.map((page) =>
              page.data?.listings?.map((item) => (
                <div className="m-1.5" key={item.id}>
                  <CardComponent
                    id={item.id}
                    title={item.name}
                    key={item.id}
                    rating={item.averageRating}
                    imageSrc={
                      item?.images?.[0]?.thumbnailImageUrl ||
                      placeholderImageUrl
                    }
                    location={item?.location}
                    price={item?.price}
                    subtitle="Villa"
                  />
                </div>
              ))
            )}{" "}
        </div>
      ) : (
        <div className="m-4 grid grid-cols-3 -mx-1.5 py-3">
          {Array.from({ length: 10 })?.map((_, i) => (
            <ProductSkeletonCard isOtherListing={true} key={i} />
          ))}
        </div>
      )}
      {isLoading ? (
        <div className="m-4 grid grid-cols-3 -mx-1.5 py-3">
          {Array.from({ length: 10 })?.map((_, i) => (
            <ProductSkeletonCard isOtherListing={true} key={i} />
          ))}
        </div>
      ) : (
        <></>
      )}

      {/* Load More Button - Hidden but used to trigger infinite loading */}
      <div></div>
      <div className="w-full flex" ref={intersectionRef}>
        {isError && (
          <p className="text-red-500">Error loading deals. Please try again.</p>
        )}

        {!isLoading &&
          !isError &&
          !hasNextPage &&
          listings &&
          listings.pages[0]?.data?.listings?.length === 0 && (
            <p className="text-[#585757] font-Roboto-Semibold">
              Deals not found.
            </p>
          )}
      </div>
    </div>
  );
}
