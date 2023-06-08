import { DbApartment } from "@packages/db/models/listings/apartment";
import { UserProfile } from "../users/userProfile";
import { Address, NewAddress } from "./address";

interface ApartmentRelations {
  address: Address;
  owner: UserProfile;
}

export type Apartment = DbApartment & ApartmentRelations;

export type NewApartment = Omit<
  DbApartment,
  "id" | "addressId" | "addressProof"
> & {
  address: NewAddress;
  addressProof?: File;
};
