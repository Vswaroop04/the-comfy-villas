import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";
import { TAddResident } from "@/types/Resident";

export default async function addResident(
  content?: TAddResident
): Promise<{
  message: string;
  user?: Partial<TUser>;
}> {
  const responseData = await httpClient({
    url: `/resident/add`,
    method: "POST",
    isCustomUrl: false,
    body: JSON.stringify(content),
  });
  return responseData;
}
