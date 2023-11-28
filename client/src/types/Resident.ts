export interface TAddResident {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface TDeleteResident {
  email: string;
}

export interface TFeedback {
  listingId: string;
  amenitiesRatings?: number;
  managementRatings?: number;
  serviceRatings?: number;
  review?: string;
}