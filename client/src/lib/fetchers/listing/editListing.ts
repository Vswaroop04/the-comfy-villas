import httpClient from "../../../utils/httpClient";

import { TEditListingRequest, TEditListingResponse } from "@/types/Listing";

export async function editListing(
  content: TEditListingRequest,
): Promise<{ message: string; updatedListing: TEditListingResponse }> {
  const responseData = await httpClient({
    url: `/listing/edit`,
    method: "POST",
    body: JSON.stringify(content),

  });

  return responseData;
}
