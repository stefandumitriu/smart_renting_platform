import { DbFavouriteListing } from "@packages/db/models/listings/favouriteListing";

export type FavouriteListing = DbFavouriteListing;

export interface NewFavouriteListing {
  userId: string;
  listingId: string;
}
