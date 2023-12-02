import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import httpClient from "@/utils/httpClient";

export default async function uploadPhotos(formData: FormData): Promise<{
  fullImage: string;
  thumbnail: string;
}> {
  const response : any = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/listing/imageUpload`,
    {
      method: "POST",
      body: formData,
      credentials: "include",
    }
    
  );
  return response;
}
