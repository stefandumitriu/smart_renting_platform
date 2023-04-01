import { Application, NewApplication } from "../../models/listings/application";
import {
  ApplicationStatus,
  DbApplication,
} from "@packages/db/models/listings/application";
import { v4 as uuidv4 } from "uuid";
import { getUserProfileById } from "@packages/db/services";
import { getListing } from "../../services/listings/listingService";
import { convertDbUserProfileToAPIUserProfile } from "../users/userProfile";

export function convertNewApplicationToDbApplication(
  newApplication: NewApplication
): DbApplication {
  return {
    ...newApplication,
    id: uuidv4(),
    status: ApplicationStatus.Waiting,
  };
}

export async function convertDbApplicationToAPIApplication(
  dbApplication: DbApplication
): Promise<Application> {
  const tenant = await getUserProfileById(dbApplication.tenantId);
  const landlord = await getUserProfileById(dbApplication.landlordId);
  const listing = await getListing(dbApplication.listingId);

  if (!tenant || !landlord || !listing) {
    throw new Error("Resource not found");
  }

  return {
    ...dbApplication,
    tenant: convertDbUserProfileToAPIUserProfile(tenant),
    landlord: convertDbUserProfileToAPIUserProfile(landlord),
    listing,
  };
}
