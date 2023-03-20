import {
  DbFavouriteListing,
  FAVOURITE_LISTINGS_TABLE_NAME,
} from "../../models/listings/favouriteListing";
import knex from "../../knex";

export async function storeFavouriteListing(
  favouriteListing: DbFavouriteListing
): Promise<DbFavouriteListing[]> {
  return knex(FAVOURITE_LISTINGS_TABLE_NAME)
    .insert(favouriteListing)
    .returning(["id", "userId", "listingId"]);
}

export async function getUserFavouriteListings(
  userId: string
): Promise<DbFavouriteListing[]> {
  return knex<DbFavouriteListing>(FAVOURITE_LISTINGS_TABLE_NAME)
    .select()
    .where({ userId });
}

export async function deleteFavouriteListing(id: string): Promise<void> {
  await knex(FAVOURITE_LISTINGS_TABLE_NAME).delete().where({ id });
}
