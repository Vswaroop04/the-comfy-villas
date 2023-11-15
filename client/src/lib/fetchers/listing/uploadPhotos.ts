import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function uploadPhotos(
  formData: FormData,
): Promise<{
  fullImage: string;
  thumbnail: string;
}> {
  const responseData = await httpClient({
    url: `/listing/imageUpload`,
    method: "POST",
    isCustomUrl: false,
    body: formData,
  });
  return responseData;
}
