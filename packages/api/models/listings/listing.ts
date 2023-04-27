import { DbListing } from "@packages/db/models/listings/listing";
import { Apartment } from "./apartment";

export interface ListingRelations {
  apartment: Apartment;
}

export type Listing = DbListing & ListingRelations;

export type NewListing = Omit<DbListing, "id" | "photosUrl"> & {
  photos: File[];
};
