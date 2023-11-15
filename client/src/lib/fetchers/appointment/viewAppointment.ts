import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function viewAppointments(
  req?: SSRreq,
  csrfToken?: string,
): Promise<{
  data?: TResponseViewAppointments[];
}> {
  const responseData = await httpClient({
    url: `/appointment/view`,
    method: "GET",
    isCustomUrl: false,
      ...SSRHeaders(req, csrfToken), 

  });
  return responseData;
}
