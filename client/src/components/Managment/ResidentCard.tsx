import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import DeleteResidentPopup from "../Popups/DeleteResidentPopup";

const ResidentCard = ({ resident }: any) => {
  const [isDeletePopup, setIsDeletePopup] = useState(false);

  const { id, name, email, phone, listing, ratings, reviews } = resident;

  return (
    <div className="border bg-white p-4 mb-4 rounded-lg shadow transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-indigo-600">{name}</h3>
          <div className="text-sm text-gray-600">
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Listing Details:</h4>
              <p>ID: {listing.id}</p>
              <p>Name: {listing.name}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"}>
                <MoreVerticalIcon className="h-5 w-5 text-gray-600 hover:text-gray-800" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white rounded-md shadow-lg">
              <DropdownMenuItem
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setIsDeletePopup(true);
                }}
              >
                Delete Resident
              </DropdownMenuItem>
              {/* You can add more menu items here */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {isDeletePopup && (
        <DeleteResidentPopup
          isOpen={isDeletePopup}
          setOpen={setIsDeletePopup}
          email={id}
        />
      )}
    </div>
  );
};

export default ResidentCard;
