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
