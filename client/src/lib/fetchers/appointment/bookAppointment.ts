import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function bookAppointment(
  content?: TRequestAppointment
): Promise<{
  message: string;
  newAppointment?: TResponseAppointment;
}> {
  const responseData = await httpClient({
    url: `/appointment/book`,
    method: "POST",
    isCustomUrl: false,

    body: JSON.stringify(content),
  });
  return responseData;
}
