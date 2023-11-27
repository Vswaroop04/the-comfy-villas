import { TImage } from "./Listing";

type TListingFilter = {
  id?: string;
  page?: number;
  limit?: number;
  searchText?: string;
  sort?: {
    price?: number;
    date?: number;
  };
};

export type TListingFilterWithID = {
  id: string;
} & TListingFilter;

export type TListingFilterWithSearchText = {
  searchText: string;
} & TListingFilter;

interface TRatings {
  id?: string;
  userId?: string;
  listingId?: string;
  amenitiesRatings?: number;
  managementRatings?: number;
  serviceRatings?: number;
  totalRating?: number;
}
interface TReviews {
  id?: string;
  userId?: string;
  listingId?: string;
  review?: string;
  user?: {
    name?: string;
  };
}

interface TAppointment {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  listingId?: string;
}
export type ListingReturnFilter = {
  id?: string;
  name?: string;
  images: TImage[];
  beds?: number;
  bathrooms?: number;
  price?: number;
  amenities?: string[];
  location?: string;
  ratings?: TRatings[];
  reviews?: TReviews[];
  averageRating?: number;
  appointments?: TAppointment[];
  rank?: number;
};

export type TListingReturnFilter<T extends "res" | "req"> = T extends "res"
  ? Partial<ListingReturnFilter>
  : Partial<Record<keyof ListingReturnFilter, false | 0 | true>>;

export default TListingFilter;
