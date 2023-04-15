import { DbListing } from "@packages/db/models/listings/listing";
import { Listing } from "../../models/listings/listing";
import { getApartmentById } from "@packages/db/services";
import { convertDbApartmentToApartment } from "./apartment";

export async function convertDbListingToAPIListing(
  dbListing: DbListing
): Promise<Listing> {
  const dbApartment = await getApartmentById(dbListing.apartmentId);
  if (!dbApartment) {
    throw new Error(`${dbListing.id}: Apartment not found`);
  }
  const apartment = await convertDbApartmentToApartment(dbApartment);
  return {
    ...dbListing,
    apartment,
  };
}
