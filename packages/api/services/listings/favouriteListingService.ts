import {
  FavouriteListing,
  NewFavouriteListing,
} from "../../models/listings/favouriteListing";
import {
  getUserFavouriteListings,
  storeFavouriteListing,
} from "@packages/db/services/listings/favouriteListingService";
import { convertNewFavouriteListingToDbFavouriteListing } from "../../convertors/listings/favouriteListing";

export async function createNewFavouriteListing(
  newFavouriteListing: NewFavouriteListing
): Promise<FavouriteListing> {
  return (
    await storeFavouriteListing(
      convertNewFavouriteListingToDbFavouriteListing(newFavouriteListing)
    )
  )[0];
}

export async function getUserFavouriteListing(
  userId: string
): Promise<FavouriteListing[]> {
  return getUserFavouriteListings(userId);
}
