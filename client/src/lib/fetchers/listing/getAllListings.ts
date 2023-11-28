import httpClient from "../../../utils/httpClient";

import {  TAddListingResponse } from "@/types/Listing";

export async function getAllListings(
): Promise<{ message: string; listings: TAddListingResponse[] }> {
  const responseData = await httpClient({
    url: `/listing/all`,
    method: "GET",
  });

  return responseData;
}
