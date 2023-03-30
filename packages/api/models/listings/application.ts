import { DbApplication } from "@packages/db/models/listings/application";
import { UserProfile } from "../users/userProfile";
import { Listing } from "./listing";

interface ApplicationRelations {
  landlord: UserProfile;
  tenant: UserProfile;
  listing: Listing;
}

export type Application = DbApplication & ApplicationRelations;

export type NewApplication = Omit<DbApplication, "id" | "status">;
