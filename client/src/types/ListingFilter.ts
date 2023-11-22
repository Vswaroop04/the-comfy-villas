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

export type ListingReturnFilter = {
  id?: boolean;
  name?: boolean;
  images: TImage[];
  beds?: boolean;
  Bathrooms?: boolean;
  Price?: boolean;
  amenities?: boolean;
  location?: boolean;
  ratings?: boolean;
  reviews?: boolean;
};

export type TListingReturnFilter<T extends "res" | "req"> = T extends "res"
  ? Partial<ListingReturnFilter>
  : Partial<Record<keyof ListingReturnFilter, false | 0 | true>>;

export default TListingFilter;
