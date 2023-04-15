import { DbApartment } from "@packages/db/models/listings/apartment";
import { Apartment } from "../../models/listings/apartment";
import { getAddressById, getUserProfileById } from "@packages/db/services";
import { convertDbUserProfileToAPIUserProfile } from "../users/userProfile";

export async function convertDbApartmentToApartment(
  dbApartment: DbApartment
): Promise<Apartment> {
  const address = await getAddressById(dbApartment.addressId);
  const owner = await getUserProfileById(dbApartment.ownerId);
  if (!address) {
    throw new Error(`${dbApartment.id}: Address not found`);
  }
  if (!owner) {
    throw new Error(`${dbApartment.id}: Owner not found`);
  }
  return {
    ...dbApartment,
    address,
    owner: convertDbUserProfileToAPIUserProfile(owner),
  };
}
