import { Listing } from "../../models/listings/listing";
import {
  getAddressById,
  getApartmentById,
  getListingById,
  getListingByOwnerId,
  getListings,
  getUserProfileById,
} from "@packages/db/services";
import { Apartment } from "../../models/listings/apartment";
import { convertDbUserProfileToAPIUserProfile } from "../../convertors/users/userProfile";
import { convertDbListingToAPIListing } from "../../convertors/listings/listing";

export async function getAllListings(): Promise<Listing[]> {
  const dbListings = await getListings();
  return Promise.all(dbListings.map(convertDbListingToAPIListing));
}

export async function getListing(id: string): Promise<Listing> {
  const dbListing = await getListingById(id);
  if (!dbListing) {
    throw new Error(`Listing ${id} not found`);
  }
  return convertDbListingToAPIListing(dbListing);
}

export async function getUsersListings(ownerId: string) {
  const dbListings = await getListingByOwnerId(ownerId);
  return Promise.all(
    dbListings.map(async (dbListing) => {
      return convertDbListingToAPIListing(dbListing);
    })
  );
}
