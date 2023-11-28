// pages/index.js or your specific page component
"use client";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { TListingReturnFilter } from "@/types/ListingFilter";
import { Wifi, Martini, PawPrint, Waves, Utensils, Plug } from "lucide-react";
import { Button } from "../ui/button";
import RatingComponent from "../Home/RatingComponent";
import BookAppointment from "./BookAppointment";

const amenities = [
  { name: "Pet-friendly", icon: PawPrint },
  { name: "Free WiFi", icon: Wifi },
  { name: "Bar", icon: Martini },
  { name: "Pool", icon: Waves },
  { name: "Restaurant", icon: Utensils },
  { name: "Electric vehicle charging point", icon: Plug },
];
const getAverageRating = (ratings: any, key: any) => {
  const total = ratings.reduce(
    (acc: any, rating: any) => acc + (rating[key] || 0),
    0
  );
  return total / ratings.length;
};

const TabContent = ({ children }: any) => <div className="p-4">{children}</div>;

export default function Home({
  ListingDetails,
}: {
  ListingDetails: TListingReturnFilter<"res">;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openAppointmentTab, setAppointmentTab] = useState(false);

  const averageAmenitiesRating = getAverageRating(
    ListingDetails.ratings,
    "amenitiesRatings"
  );
  const averageManagementRating = getAverageRating(
    ListingDetails.ratings,
    "managementRatings"
  );
  const averageServiceRating = getAverageRating(
    ListingDetails.ratings,
    "serviceRatings"
  );

  return (
    <div className="min-h-screen">
      <Head>
        <title>Villa Details</title>
      </Head>

      <div className=" mx-auto p-4 pr-48">
        <div className="flex flex-wrap bg-slate-200 rounded-t-lg">
          {["overview", "BedRooms", "bathrooms", "amenities", "reviews"].map(
            (tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 text-sm lg:text-base ${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600 hover:text-blue-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            )
          )}
        </div>

        <div className="bg-white p-4 rounded-b-lg">
          {activeTab === "overview" && (
            <TabContent>
              <h1 className="text-4xl  font-bold">{ListingDetails.name}</h1>
              <p className="my-2">
                Featuring everything you need for a simple, engaging place to
                rest, recharge, and get things done.
              </p>
              <div className="flex items-center space-x-2">
                <p>
                  This is Ranked
                  <span className="bg-violet-800 text-white rounded-none px-2 py-1 ml-2 mr-2 inline-block">
                    #{ListingDetails.rank}
                  </span>
                  in Our Community.
                </p>
              </div>
              <div className="my-2 flex">
                <RatingComponent rating={ListingDetails?.averageRating || 4} />
                <p className=" my-2 mx-2 text-gray-600">
                  {" "}
                  {ListingDetails?.averageRating}
                </p>
              </div>
              {ListingDetails.ratings && ListingDetails.ratings.length > 0 && (
                <div className="mx-auto p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                      <div className="mb-2 flex items-center">
                        <p className="text-gray-600 flex-grow">
                          Amenities Ratings
                        </p>
                        <RatingComponent rating={averageAmenitiesRating} />
                      </div>
                      <div className="mb-2 flex items-center">
                        <p className="text-gray-600 flex-grow">
                          Management Ratings
                        </p>
                        <RatingComponent rating={averageManagementRating} />
                      </div>
                      <div className="flex items-center">
                        <p className="text-gray-600 flex-grow">
                          Service Ratings
                        </p>
                        <RatingComponent rating={averageServiceRating} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabContent>
          )}

          {activeTab === "BedRooms" && (
            <TabContent>
              This villa has {ListingDetails.beds} number of BedRooms.
            </TabContent>
          )}

          {activeTab === "bathrooms" && (
            <TabContent>
              This villa has {ListingDetails.bathrooms} number of bathrooms.
            </TabContent>
          )}

          {activeTab === "amenities" && (
            <TabContent>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Popular amenities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <amenity.icon className="w-6 h-6 text-gray-700" />
                      <span className="text-gray-600">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabContent>
          )}
          {activeTab === "reviews" && (
            <TabContent>
              {" "}
              {ListingDetails.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
                >
                  <div className="mb-2 items-center">
                    <h1 className="font-bold mb-8 text-3xl">
                      {" "}
                      {review.user?.name} (Resident)
                    </h1>
                    <p className="text-lg"> {review.review}</p>
                  </div>
                </div>
              ))}
            </TabContent>
          )}
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-2">Location</h2>
            <div className="relative h-60">
              <Link href="https://maps.google.com/?q=Montreal,Canada">
                <Image
                  src="/assets/Map.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Map of Montreal, Canada"
                />
              </Link>
            </div>
            <a
              href="https://maps.google.com/?q=Montreal,Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-blue-600 bg-slate-500 p-2 rounded-lg"
            >
              View in a map
            </a>
          </div>
          <Button
            type="button"
            className="w-full text-[#FFFFFF] bg-[#580d83] default lg"
            variant={"outline"}
            onClick={() => {
              setAppointmentTab(true);
            }}
          >
            Book Appointment
          </Button>
        </div>
      </div>
      {openAppointmentTab && (
        <BookAppointment
          isOpen={openAppointmentTab}
          setOpen={setAppointmentTab}
          listingId={ListingDetails.id || ""}
          listingName={ListingDetails.name || ""}
        />
      )}
    </div>
  );
}
