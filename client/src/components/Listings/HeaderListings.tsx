import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import getFilteredListings from "@/lib/fetchers/listing/filter";
import filterAtom from "@/store/filterAtom";
import { useAtom } from "jotai";

const ListingComponent = () => {
  const [filter, setFilterData] = useAtom(filterAtom);
  const [sortOptions, setSortOptions] = useState(false);
  const [range, setRange] = useState();

  const handleSortOptionClick = async (sort: {
    price?: number;
    date?: number;
  }) => {
    setFilterData({
      ...filter,
      limit: 9,
      sort ,
    });
  };

  return (
    <div className=" my-10">
      <div>
        <p className="text-2xl text-[#65AEF2]">Special Offers</p>
        <div className="relative flex justify-between items-center">
          <h1 className="text-5xl font-semibold mt-2">
            Best offers of the month
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <p className="mr-40 text-2xl text-[#65AEF2] hover:scale-105">
                  Sort By
                </p>
                {sortOptions && <div></div>}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5">
                <button onClick={() => handleSortOptionClick({})}>
                  Relevance
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5">
                <button onClick={() => handleSortOptionClick({ price: 1 })}>
                  Price : Low To High
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5">
                <button onClick={() => handleSortOptionClick({ price: -1 })}>
                  Price : High To Low
                </button>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5">
                <button onClick={() => handleSortOptionClick({ date: -1 })}>
                  Latest
                </button>{" "}
              </DropdownMenuItem>
              <DropdownMenuItem className=" transition-[transform] duration-200 hover:scale-105 bg-white  p-5">
                <button onClick={() => handleSortOptionClick({ date: 1 })}>
                  Oldest
                </button>{" "}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mt-8">
          Experience Fantastic Benefits and Obtain Better Rates When You Make a
          Direct Appointment on Our Official Website
        </p>
      </div>
    </div>
  );
};

export default ListingComponent;
