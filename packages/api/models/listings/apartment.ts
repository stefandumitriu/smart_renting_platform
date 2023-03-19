import { DbApartment } from "@packages/db/models/listings/apartment";
import { UserProfile } from "../users/userProfile";
import { Address } from "./address";

export interface ApartmentRelations {
  address: Address;
  owner: UserProfile;
}

export type Apartment = DbApartment & ApartmentRelations;
