import { TAddListingResponse } from "@/types/Listing";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import Image from "next/image";
import {
  ArrowRightIcon,
  Check,
  Edit,
  Eye,
  Heart,
  InfoIcon,
  MoreVerticalIcon,
  MoveRight,
  Phone,
} from "lucide-react";
import Link from "next/link";

export default function LisitngCard(data: any) {
    console.log(data)
  return (
    <div>
      <Card className="border-brand-mblue">
        <CardContent className="relative p-2">
          <div className="grid grid-cols-[auto_1fr] grid-rows-[repeat(4,minmax(0,auto))] gap-2 lg:grid-cols-[max-content_1fr_1fr_1fr] xl:grid-cols-[max-content_max-content_auto_auto_auto]">
            <div className="col-span-full flex w-full justify-between gap-1 rounded-md p-2 pr-10 text-white xl:col-span-1 xl:row-span-full xl:w-[105px] xl:flex-col xl:items-start xl:rounded-r-none xl:pr-0 bg-brand-mblue xl:justify-center">
              <div className="grid">
                <div className="flex items-center gap-2 xl:grid xl:gap-0">
                  <small className="text-[8px] sm:text-[10px]">Price</small>
                  <span className="flex flex-col text-[12px] font-semibold sm:text-[18px]">
                    {data.price}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative lg:row-span-3 xl:row-span-full">
              <div className="max-h-[108px] max-w-[90px] overflow-hidden sm:max-h-[180px] sm:max-w-[150px]">
                <Image
                  src={data?.images[0]?.thumbnailImageUrl}
                  width={100}
                  height={100}
                  className="h-[108px] w-[90px] sm:h-[180px] sm:w-[150px]"
                  alt={data?.name}
                />
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                className={`absolute right-2 top-[22px] h-max rounded-sm p-0 hover:bg-black/10 xl:top-2`}
              >
                <MoreVerticalIcon className="h-5 text-white xl:text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="no-scrollbar overflow-auto">
              <DropdownMenuItem className="cursor-pointer">
                Edit Listing
              </DropdownMenuItem>
              {/* </Link> */}
              <DropdownMenuItem
                className="cursor-pointer"
                // onClick={() => setOpenDeleteListing(true)}
              >
                Delete Listing
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
    </div>
  );
}
