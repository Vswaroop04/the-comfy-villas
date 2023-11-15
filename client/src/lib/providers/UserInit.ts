import isLoggedIn from "@/lib/fetchers/auth/isloggedin";
import globalLoadingAtom from "@/store/loading";
import { userAtom } from "@/store/User";
import { useQuery } from "@tanstack/react-query";
import fetchIntercept from "fetch-intercept";
import { atom, useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export const hasUserResolvedAtom = atom(false);

const UserInit = () => {
  const userSetter = useSetAtom(userAtom);
  // const [csrfToken, csrfSetter] = useState<string>(
  // 	'1892544d-f8b3-4f59-b540-34cc6d1dd9ba',
  // );
  const [csrfToken, csrfSetter] = useState<string>();
  const setIsLoading = useSetAtom(globalLoadingAtom);
  const setHasUserResolved = useSetAtom(hasUserResolvedAtom);

  useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      setIsLoading({
        isLoading: true,
        reason: "Fetching user data",
      });
      const data = await isLoggedIn();
      csrfSetter(data.csrfToken);
      userSetter(data.user);
      setIsLoading(false);
      setHasUserResolved(true);
      return data;
    },
  });

  useEffect(() => {
    if (csrfToken === undefined) return;
    // Add a request interceptor
    const unregister = fetchIntercept.register({
      request: function (url : any, config : any) {
        // Modify the url or config here
        if (config.headers === undefined) config.headers = {};
        config.headers["X-CSRF-Token"] = csrfToken;
        return [url, config];
      },
    });

    return () => {
      // Unregister your interceptor
      unregister();
    };
  }, [csrfToken]);
  return null;
};

export default UserInit;
