import { Listing } from "../../models/listings/listing";
import {
  getAddressById,
  getApartmentById,
  getListingById,
  getListings,
  getUserProfileById,
} from "@packages/db/services";
import { Apartment } from "../../models/listings/apartment";
import { convertDbUserProfileToAPIUserProfile } from "../../convertors/users/userProfile";

export async function getAllListings(): Promise<Listing[]> {
  const dbListings = await getListings();
  return Promise.all(
    dbListings.map(async (listing) => {
      const dbApartment = await getApartmentById(listing.apartmentId);
      if (!dbApartment) {
        throw new Error(`${listing.id}: Apartment not found`);
      }
      const address = await getAddressById(dbApartment.addressId);
      const owner = await getUserProfileById(dbApartment.ownerId);
      if (!address) {
        throw new Error(`${listing.id}: Address not found`);
      }
      if (!owner) {
        throw new Error(`${listing.id}: Owner not found`);
      }
      const apartment: Apartment = {
        ...dbApartment,
        address,
        owner: convertDbUserProfileToAPIUserProfile(owner),
      };
      return {
        ...listing,
        apartment,
      };
    })
  );
}

export async function getListing(id: string): Promise<Listing> {
  const dbListing = await getListingById(id);
  if (!dbListing) {
    throw new Error(`Listing ${id} not found`);
  }
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
