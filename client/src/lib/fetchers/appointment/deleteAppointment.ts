import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function deleteAppointment(
  appointmentId?: string
) {
  const responseData = await httpClient({
    url: `/appointment/delete`,
    method: "POST",
    isCustomUrl: false,
    body: JSON.stringify(appointmentId),
  });
  return responseData;
}
