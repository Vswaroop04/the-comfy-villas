import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function logout(
  req?: SSRreq,
  csrfToken?: string
): Promise<{
  isLoggedIn: boolean;
}> {
  const responseData = await httpClient({
    url: `/user/logout`,
    method: "GET",
    isCustomUrl: false,
    ...SSRHeaders(req, csrfToken),
  });
  return responseData;
}
