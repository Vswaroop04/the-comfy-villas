import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";

export default async function isLoggedIn(req?: SSRreq): Promise<{
  isLoggedIn: boolean;
  csrfToken: string;
  user?: Partial<TUser>;
}> {
  const responseData = await httpClient({
    url: `/user/isloggedin`,
    method: "GET",
    isCustomUrl: false,
    ...SSRHeaders(req),
  });
  return responseData;
}
