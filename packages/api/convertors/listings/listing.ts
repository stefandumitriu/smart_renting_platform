import { DbListing } from "@packages/db/models/listings/listing";
import { Listing } from "../../models/listings/listing";
import {
  getAddressById,
  getApartmentById,
  getUserProfileById,
} from "@packages/db/services";
import { Apartment } from "../../models/listings/apartment";
import { convertDbUserProfileToAPIUserProfile } from "../users/userProfile";

export async function convertDbListingToAPIListing(
  dbListing: DbListing
): Promise<Listing> {
  const dbApartment = await getApartmentById(dbListing.apartmentId);
  if (!dbApartment) {
    throw new Error(`${dbListing.id}: Apartment not found`);
  }
  const address = await getAddressById(dbApartment.addressId);
  const owner = await getUserProfileById(dbApartment.ownerId);
  if (!address) {
    throw new Error(`${dbListing.id}: Address not found`);
  }
  if (!owner) {
    throw new Error(`${dbListing.id}: Owner not found`);
  }
  const apartment: Apartment = {
    ...dbApartment,
    address,
    owner: convertDbUserProfileToAPIUserProfile(owner),
  };
  return {
    ...dbListing,
    apartment,
  };
}
