import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";
import { MoreVerticalIcon } from "lucide-react";
import AddListingPopup from "../Popups/AddListingPopup";
import EditListingPopup from "../Popups/EditListingPopup";
import DeleteListingPopup from "../Popups/DeleteListingPopup";
import { TAddListingResponse } from "@/types/Listing";
import { TListingReturnFilter } from "@/types/ListingFilter";

export default function ListingCard({
  data,
  setFilteredListing,
  setIsAddPopup,
  isAddPopup,
}: {
  data?: TListingReturnFilter<"res">;
  setFilteredListing: React.Dispatch<
    React.SetStateAction<TAddListingResponse[]>
  >;
  setIsAddPopup: React.Dispatch<React.SetStateAction<boolean>>;
  isAddPopup: boolean;
}) {
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  return (
    <div className="w-full lg:w-1/2">
      <Card className="m-2 border-brand-mblue bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  unoptimized
                  src={
                    data?.images?.[0]
                      ? data.images[0].thumbnailImageUrl
                      : "/default-image.jpg"
                  }
                  alt={data?.name || ""}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {data?.name}
                </h3>
                <p className="text-sm text-gray-600">{data?.location}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm font-medium text-brand-mblue">
                    {data?.price} USD
                  </span>
                  <span>•</span>
                  <span className="text-sm text-gray-500">
                    {data?.beds} Beds
                  </span>
                  <span>•</span>
                  <span className="text-sm text-gray-500">
                    {data?.bathrooms} Baths
                  </span>
                </div>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"}>
                  <MoreVerticalIcon className="h-5 w-5 text-gray-600" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setIsEditPopup(true);
                  }}
                >
                  Edit Listing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setIsDeletePopup(true);
                  }}
                >
                  Delete Listing
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-700">Amenities</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {data?.amenities?.map((amenity: any, index: any) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {isAddPopup && (
        <AddListingPopup
          isOpen={isAddPopup}
          setOpen={setIsAddPopup}
          setFilteredListing={setFilteredListing}
        />
      )}
      {isDeletePopup && (
        <DeleteListingPopup
          isOpen={isDeletePopup}
          setOpen={setIsDeletePopup}
          listingId={data?.id || ""}
          setFilteredListing={setFilteredListing}
        />
      )}

      {isEditPopup && (
        <EditListingPopup
          isOpen={isEditPopup}
          setOpen={setIsEditPopup}
          setFilteredListing={setFilteredListing}
          data={data}
        />
      )}
    </div>
  );
}
