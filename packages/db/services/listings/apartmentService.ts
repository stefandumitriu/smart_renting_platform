import knex from "../../knex";
import {
  APARTMENTS_TABLE_NAME,
  DbApartment,
} from "../../models/listings/apartment";

export async function storeApartment(
  apartment: DbApartment
): Promise<DbApartment> {
  await knex(APARTMENTS_TABLE_NAME).insert(apartment);
  const addedApartment = await getApartmentById(apartment.id);
  if (!addedApartment) {
    throw new Error("Error on insert: Apartment");
  }
  return addedApartment;
}

export async function getApartmentById(
  id: string
): Promise<DbApartment | undefined> {
  return knex<DbApartment>(APARTMENTS_TABLE_NAME)
    .where({ id })
    .select()
    .first();
}

export async function getApartmentsByOwnerId(
  ownerId: string
): Promise<DbApartment[]> {
  return knex<DbApartment>(APARTMENTS_TABLE_NAME).where({ ownerId }).select();
}

export async function updateApartment(
  id: string,
  apartment: Partial<DbApartment>
): Promise<DbApartment> {
  await knex(APARTMENTS_TABLE_NAME).where({ id }).update(apartment);
  return (await getApartmentById(id)) as DbApartment;
}

export async function deleteApartment(id: string): Promise<void> {
  await knex(APARTMENTS_TABLE_NAME).where({ id }).delete();
}
