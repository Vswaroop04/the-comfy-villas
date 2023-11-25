// OffersGridComponent.jsx
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import TListingFilter, {
  TListingFilterWithID,
  TListingReturnFilter,
  TListingFilterWithSearchText,
} from "@/types/ListingFilter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import getFilteredListings from "@/lib/fetchers/listing/filter";
import { useTranslation } from "next-i18next";
import RatingComponent from "./RatingComponent";
import CardComponent from "./CardComponent";

type TProps = {
  offers: TListingReturnFilter<"res">[] | null;
};

const OffersGridComponent = ({ offers }: any) => {
  return (
    <div className="2xl:container">
      {/* Assume HeaderElement is imported and used here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {offers &&
          offers?.map((offer: any) => (
            <CardComponent
              key={offer.id}
              title={offer.title}
              subtitle="Villa"
              location={offer.location}
              price={offer.price}
              rating={offer.averageRating}
              imageSrc={offer.images[0].thumbnailImageUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default OffersGridComponent;
