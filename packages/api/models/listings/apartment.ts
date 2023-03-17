import { DbApartment } from "@packages/db/models/listings/apartment";
import { DbAddress } from "@packages/db/models/listings/address";
import { DbUserProfile } from "@packages/db/models/users/userProfile";

export interface ApartmentRelations {
  address: DbAddress;
  owner: DbUserProfile;
}

export type Apartment = DbApartment & ApartmentRelations;
