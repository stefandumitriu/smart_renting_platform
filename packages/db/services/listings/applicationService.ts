import {
  APPLICATIONS_TABLE_NAME,
  DbApplication,
} from "../../models/listings/application";
import knex from "../../knex";

export async function storeApplication(
  application: Omit<DbApplication, "created_at">
): Promise<DbApplication[]> {
  return knex(APPLICATIONS_TABLE_NAME)
    .insert(application)
    .returning(Object.keys(application));
}

export async function getLandlordApplications(
  landlordId: string
): Promise<DbApplication[]> {
  return knex<DbApplication>(APPLICATIONS_TABLE_NAME)
    .where({ landlordId })
    .select();
}

export async function getTenantApplications(
  tenantId: string
): Promise<DbApplication[]> {
  return knex<DbApplication>(APPLICATIONS_TABLE_NAME)
    .where({ tenantId })
    .select();
}

export async function getApplicationsForListing(
  listingId: string
): Promise<DbApplication[]> {
  return knex<DbApplication>(APPLICATIONS_TABLE_NAME)
    .where({ listingId })
    .select();
}

export async function deleteApplication(id: string): Promise<void> {
  await knex(APPLICATIONS_TABLE_NAME).where({ id }).delete();
}
