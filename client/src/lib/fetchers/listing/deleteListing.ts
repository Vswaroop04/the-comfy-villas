import httpClient from "../../../utils/httpClient";

import { TDeleteListingRequest } from "@/types/Listing";

export async function deleteListing(
  content: TDeleteListingRequest
): Promise<{ message: string }> {
  const responseData = await httpClient({
    url: `/listing/delete`,
    method: "POST",
    body: JSON.stringify(content),
  });

  return responseData;
}
