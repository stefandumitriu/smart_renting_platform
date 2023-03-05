import {
  DbListing,
  DbListingRelations,
} from "@packages/db/models/listings/listing";

export type Listing = DbListing & DbListingRelations;
