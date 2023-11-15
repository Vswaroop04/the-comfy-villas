import httpClient from "../../../utils/httpClient";

import { TAddListingRequest, TAddListingResponse } from "@/types/Listing";

export async function addListing(
  content: TAddListingRequest,
): Promise<{ message: string; listing: TAddListingResponse }> {
  const responseData = await httpClient({
    url: `/listing/add`,
    method: "POST",
    body: JSON.stringify(content),
  });

  return responseData;
}
