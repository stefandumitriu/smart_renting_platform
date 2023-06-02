import { DbListing } from "@packages/db/models/listings/listing";
import { Listing } from "../../models/listings/listing";
import { getApartmentById } from "@packages/db/services";
import { convertDbApartmentToApartment } from "./apartment";
import _ from "lodash";
import { getSignedUrlForResource } from "../../aws/s3Fetcher";

export async function convertDbListingToAPIListing(
  dbListing: DbListing
): Promise<Listing> {
  const dbApartment = await getApartmentById(dbListing.apartmentId);
  if (!dbApartment) {
    throw new Error(`${dbListing.id}: Apartment not found`);
  }
  const apartment = await convertDbApartmentToApartment(dbApartment);
  return {
    ..._.omit(dbListing, "photosUrl"),
    photosUrl: dbListing.photosUrl?.map(getSignedUrlForResource),
    apartment,
  };
}
