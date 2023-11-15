import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";
import { TFeedback } from "@/types/Resident";

export default async function deleteResident(
  content?: TFeedback
): Promise<{
  message: string;
}> {
  const responseData = await httpClient({
    url: `/resident/feedback`,
    method: "POST",
    isCustomUrl: false,
    body: JSON.stringify(content),
  });
  return responseData;
}
