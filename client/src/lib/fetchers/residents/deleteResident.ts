import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";
import { TFeedback } from "@/types/Resident";

export default async function deleteResident(email?: string): Promise<{
  message: string;
}> {
  const responseData = await httpClient({
    url: `/resident/delete`,
    method: "POST",
    isCustomUrl: false,
    body: JSON.stringify({ id: email }),
  });
  return responseData;
}
