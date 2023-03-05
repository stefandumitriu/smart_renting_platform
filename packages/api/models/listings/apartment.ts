import {
  DbApartment,
  DbApartmentRelations,
} from "@packages/db/models/listings/apartment";

export type Apartment = DbApartment & DbApartmentRelations;
