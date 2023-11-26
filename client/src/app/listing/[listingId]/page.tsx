import { getListingByID } from "@/lib/fetchers/listing/filter";

async function getData(listingId: string) {
  const filter = {
    id: listingId,
  };
  const res = await getListingByID(filter);

  return res;
}

export default async function Page({
  params,
}: {
  params: { listingId: string };
}) {
  const data = await getData(params.listingId);

  console.log(data);

  return <main></main>;
}
