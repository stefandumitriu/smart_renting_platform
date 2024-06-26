export const LISTINGS_TABLE_NAME = "listing";

export interface DbListing {
  id: string;
  lastUpdated?: Date;
  apartmentId: string;
  title: string;
  photosUrl?: string[];
  price: number;
  rentalPeriod?: string;
  availability?: string;
  about?: string;
}
