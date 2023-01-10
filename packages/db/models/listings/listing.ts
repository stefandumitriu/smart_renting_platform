import { DbApartment } from "./apartment";

export const LISTINGS_TABLE_NAME = "listing";

export interface DbListing {
  id: string;
  timeCreated: Date;
  lastUpdated: Date;
  apartmentId: string;
  ownerId: string;
  title: string;
  photosUrl?: string[];
  price: number;
  rentalPeriod?: string;
  availability?: string;
}

interface DbListingRelations {
  apartment: DbApartment;
}
