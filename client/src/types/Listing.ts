export interface TAddListingRequest {
  name: string;
  beds: number;
  bathrooms: number;
  price: number;
  images: TImage[];
  amenities?: string[];
  location: string;
}

export interface TImage {
  fullImageUrl: string;
  thumbnailImageUrl: string;

}

export interface TAddListingResponse {
  id: string;
  name: string;
  rank: number;
  images: TImage[];

  beds: number;
  bathrooms: number;
  price: number;
  amenities: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface TEditListingRequest {
  id: string;
  name?: string;
  beds?: number;
  bathrooms?: number;
  price?: number;
  images: TImage[];

  amenities?: string[];
  location?: string;
}

export interface TEditListingResponse {
  id: string;
  name: string;
  rank: number;
  images: TImage[];

  beds: number;
  bathrooms: number;
  price: number;
  amenities: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

export interface TDeleteListingRequest {
  id: string;
}
