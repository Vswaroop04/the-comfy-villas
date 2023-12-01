import { Fragment, useEffect, useState } from "react";
import { TListingReturnFilter } from "@/types/ListingFilter";
import LisitngCard from "./LisitngCard";
import { TAddListingResponse } from "@/types/Listing";

const MyListing: React.FC<{
  Listings?: Partial<TListingReturnFilter<"res">[]> | null;
  setFilteredListing: React.Dispatch<
    React.SetStateAction<TAddListingResponse[]>
  >;
  setIsAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isAddPopup: boolean;
}> = ({ Listings, setFilteredListing, setIsAddPopup, isAddPopup }) => {
  return (
    <>
      <div className="flex flex-wrap -mx-2">
        {Listings?.map((data, index) => (
          <Fragment key={index}>
            <LisitngCard
              data={data}
              setFilteredListing={setFilteredListing}
              setIsAddPopup={setIsAddPopup}
              isAddPopup={isAddPopup}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
};

export default MyListing;
