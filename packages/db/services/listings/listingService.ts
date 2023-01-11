import knex from "../../knex";
import { DbListing, LISTINGS_TABLE_NAME } from "../../models/listings/listing";

export async function storeListing(listing: DbListing): Promise<DbListing> {
  return knex(LISTINGS_TABLE_NAME).insert(listing);
}

export async function getListingById(
  id: string
): Promise<DbListing | undefined> {
  return knex<DbListing>(LISTINGS_TABLE_NAME).where({ id }).select().first();
}

export async function getListingByApartmentId(
  apartmentId: string
): Promise<DbListing | undefined> {
  return knex<DbListing>(LISTINGS_TABLE_NAME)
    .where({ apartmentId })
    .select()
    .first();
}
