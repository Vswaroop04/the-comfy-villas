export interface TAddListingRequest {
  name: string;
  Beds: number;
  Bathrooms: number;
  Price: number;
  fullImageUrl: string;
  thumbnailImageUrl: string;
  amenities?: string[];
  location: string;
}

export interface TAddListingResponse {
  id: string;
  name: string;
  rank: number;
  fullImageUrl: string;
  thumbnailImageUrl: string;
  Beds: number;
  Bathrooms: number;
  Price: number;
  amenities: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface TEditListingRequest {
  id: string;
  name?: string;
  Beds?: number;
  Bathrooms?: number;
  Price?: number;
  fullImageUrl?: string;
  thumbnailImageUrl?: string;
  amenities?: string[];
  location?: string;
}

export interface TEditListingResponse {
  id: string;
  name: string;
  rank: number;
  fullImageUrl: string;
  thumbnailImageUrl: string;
  Beds: number;
  Bathrooms: number;
  Price: number;
  amenities: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface TDeleteListingRequest {
  id: string;
}
