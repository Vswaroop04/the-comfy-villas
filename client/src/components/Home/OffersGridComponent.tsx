// OffersGridComponent.jsx
"use client"
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
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type TProps = {
  offers: TListingReturnFilter<"res">[] | null;
};

const OffersGridComponent = ({ offers }: any) => {
  const router = useRouter();
  return (
    <>
      <div className="2xl:container">
        {/* Assume HeaderElement is imported and used here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {offers &&
            offers?.map((offer: any) => (
              <CardComponent
                id = {offer.id}
                key={offer.id}
                title={offer.title}
                subtitle="Villa"
                location={offer.location}
                price={offer.price}
                rating={offer.averageRating}
                imageSrc={offer.images[0]?.thumbnailImageUrl}
              />
            ))}
        </div>

        <div className=" mt-20">
          <span
            onClick={() => {
              router.push("/listings");
            }}
            className=" flex aspect-video h-4  items-center justify-center rounded-lg bg-zinc-10 outline object-contain font-poppins text-[0.3rem] font-semibold tracking-tighter text-brand-links underline transition-all duration-200 ease-in-out hover:scale-110 hover:cursor-pointer hover:no-underline hover:drop-shadow-lg max-md:scale-75  sm:h-20 sm:text-[0.85rem] md:h-24 md:text-[1rem] lg:h-28  lg:text-[1.25rem]"
          >
            View All
            <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </>
  );
};

export default OffersGridComponent;
