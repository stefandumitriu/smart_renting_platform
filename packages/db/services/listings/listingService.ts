import knex from "../../knex";
import { DbListing, LISTINGS_TABLE_NAME } from "../../models/listings/listing";
import { APARTMENTS_TABLE_NAME } from "../../models/listings/apartment";

export async function storeListing(listing: DbListing): Promise<DbListing> {
  await knex(LISTINGS_TABLE_NAME).insert(listing);
  const addedListing = await getListingById(listing.id);
  if (!addedListing) {
    throw new Error("Store listing operation failed");
  }
  return addedListing;
}

export async function getListings(): Promise<DbListing[]> {
  return knex(LISTINGS_TABLE_NAME).select();
}

export async function getListingById(
  id: string
): Promise<DbListing | undefined> {
  return knex<DbListing>(LISTINGS_TABLE_NAME).where({ id }).select().first();
}

export async function getListingByOwnerId(
  ownerId: string
): Promise<DbListing[]> {
  return knex
    .select([
      "listing.id",
      "listing.apartmentId",
      "listing.title",
      "listing.price",
      "listing.rentalPeriod",
      "listing.availability",
      "listing.photosUrl",
    ])
    .from(LISTINGS_TABLE_NAME)
    .join(APARTMENTS_TABLE_NAME, { "apartment.id": "listing.apartmentId" })
    .where({ "apartment.ownerId": ownerId });
}
export async function getListingByApartmentId(
  apartmentId: string
): Promise<DbListing | undefined> {
  return knex<DbListing>(LISTINGS_TABLE_NAME)
    .where({ apartmentId })
    .select()
    .first();
}

export async function deleteListingById(id: string): Promise<void> {
  await knex(LISTINGS_TABLE_NAME).where({ id }).delete();
}
