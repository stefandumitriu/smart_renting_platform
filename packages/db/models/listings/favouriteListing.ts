export const FAVOURITE_LISTINGS_TABLE_NAME = "favourite_listing";

export interface DbFavouriteListing {
  id: string;
  listingId: string;
  userId: string;
}
