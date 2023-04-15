import knex from "../../knex";
import {
  APARTMENTS_TABLE_NAME,
  DbApartment,
} from "../../models/listings/apartment";

export async function storeApartment(
  apartment: DbApartment
): Promise<DbApartment> {
  return knex(APARTMENTS_TABLE_NAME).insert(apartment);
}

export async function getApartmentById(
  id: string
): Promise<DbApartment | undefined> {
  return knex<DbApartment>(APARTMENTS_TABLE_NAME)
    .where({ id })
    .select()
    .first();
}

export async function updateApartment(
  id: string,
  apartment: Partial<DbApartment>
): Promise<DbApartment> {
  await knex(APARTMENTS_TABLE_NAME).where({ id }).update(apartment);
  return (await getApartmentById(id)) as DbApartment;
}
