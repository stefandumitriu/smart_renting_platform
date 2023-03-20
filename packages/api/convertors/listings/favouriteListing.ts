import { NewFavouriteListing } from "../../models/listings/favouriteListing";
import { DbFavouriteListing } from "@packages/db/models/listings/favouriteListing";
import { v4 as uuidv4 } from "uuid";

export function convertNewFavouriteListingToDbFavouriteListing(
  newFavouriteListing: NewFavouriteListing
): DbFavouriteListing {
  return {
    id: uuidv4(),
    ...newFavouriteListing,
  };
}
