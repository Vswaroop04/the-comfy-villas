import { getListingByID } from "@/lib/fetchers/listing/filter";
import SimpleCarousal from "@/components/ListingPage/CarouselComponent";
import ListingDetails from "@/components/ListingPage/ListingDetails"

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
  console.log(params.listingId);
  const data = await getData(params.listingId);

  console.log(data);

  return (
    <div className="mt-44 ml-28">
      <SimpleCarousal images={data?.images} />
      <ListingDetails ListingDetails={data} />
    </div>
  );
}
