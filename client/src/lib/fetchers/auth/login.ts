import SSRHeaders from "@/utils/ssrHeaders";
import SSRreq from "@/types/SSRreq";
import TUser from "@/types/user";
import httpClient from "@/utils/httpClient";

export default async function login(
  email: string,
  password: string
): Promise<{
  message: string;
  user?: Partial<TUser>;
}> {
  const responseData = await httpClient({
    url: `/user/login`,
    method: "POST",
    isCustomUrl: false,
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return responseData;
}
