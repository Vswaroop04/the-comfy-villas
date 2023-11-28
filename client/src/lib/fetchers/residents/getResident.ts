interface TResidentResponse {
  user: User;
}

interface User {
  email: string;
  ratings: Rating[];
  reviews: Review[];
  name: string;
  phone: string;
  id: string;
  listing: Listing;
}

interface Listing {
  id: string;
  name: string;
  rank: number;
  beds: number;
  bathrooms: number;
  price: number;
  amenities: string[];
  location: string;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  userId: string;
  listingId: string;
  review: string;
}

interface Rating {
  id: string;
  userId: string;
  listingId: string;
  amenitiesRatings: number;
  managementRatings: number;
  serviceRatings: number;
  totalRating: number;
}

import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";
import { TDeleteResident, TFeedback } from "@/types/Resident";

export default async function getResident(token: string): Promise<{
  user: User;
}> {
  const responseData = await httpClient({
    url: `/resident/`,
    method: "GET",
    isCustomUrl: false,
    headers: {
      "X-Csrf-Token": token,
    },
  });
  return responseData;
}
