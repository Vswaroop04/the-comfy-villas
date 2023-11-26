import Image from "next/image";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";

import ListingComponent from "@/components/Home/ListingHeaderComponent";
import OffersGridComponent from "@/components/Home/OffersGridComponent";
import { NextSeo } from "next-seo";
import TListingFilter, {
  TListingFilterWithID,
  TListingReturnFilter,
  TListingFilterWithSearchText,
} from "@/types/ListingFilter";
import getFilteredListings from "@/lib/fetchers/listing/filter";

export default async function Home() {
  const filter: TListingFilter = {
    page: 1,
    limit: 9,
  };

  console.log("making request");

  const offers = await getFilteredListings(filter);
  // Ensure that the offers match the expected type
  const formattedOffers = offers.data?.listings?.map((offer: any) => ({
    id: offer.id,
    title: offer.name,
    location: offer.location,
    price: offer.price,
    averageRating: offer.averageRating,
    images: offer.images,
  }));
  return (
    <>
      <>
        <head>
          <title>Home | Comfy Villas</title>
        </head>

        <Carousel />
        <Gallery />
        <ListingComponent />
        <OffersGridComponent offers={formattedOffers} />
      </>
    </>
  );
}
