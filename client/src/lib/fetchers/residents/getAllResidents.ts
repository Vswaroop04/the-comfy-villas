import { TListingReturnFilter } from "@/types/ListingFilter";

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
  listing: TListingReturnFilter<"res">;
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

export default async function getResident(req?: SSRreq): Promise<{
  message: string;
  residents: User[];
}> {
  const responseData = await httpClient({
    url: `/resident/all`,
    method: "GET",
    isCustomUrl: false,
    ...SSRHeaders(req),
  });
  return responseData;
}
