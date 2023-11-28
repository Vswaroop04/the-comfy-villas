"use client"
import getResident from "@/lib/fetchers/residents/getResident";
import isLoggedIn from "@/lib/fetchers/auth/isloggedin";

export default async function page() {
  const token = await isLoggedIn();
  const res = await getResident(token.csrfToken);

  console.log(res);
  return <div className="mt-44">page</div>;
}
