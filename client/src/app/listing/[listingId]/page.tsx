import { getListingByID } from "@/lib/fetchers/listing/filter";
import SimpleCarousal from "@/components/ListingPage/CarouselComponent";
import ListingDetails from "@/components/ListingPage/ListingDetails";

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


  return (
    <div className="mt-44 ml-28">
      <SimpleCarousal images={data?.images} height="h-[70vh]" />
      <ListingDetails ListingDetails={data} />
    </div>
  );
}
