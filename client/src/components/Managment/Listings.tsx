import { Fragment, useState } from "react";
import { TListingReturnFilter } from "@/types/ListingFilter";
import { Card, CardContent } from "@/components/ui/card";
import LisitngCard from "./LisitngCard";

const MyListing: React.FC<{
  Listings?: Partial<TListingReturnFilter<"res">[]> | null;
}> = ({ Listings }) => {
  return (
    <>
      <div className="flex flex-col gap-5">
        {Listings?.map((data, index) => (
          <Fragment key={`${Date.now() + Math.random()}${index}`}>
            <LisitngCard data={data} />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MyListing;
