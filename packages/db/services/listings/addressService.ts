import { ADDRESS_TABLE_NAME, DbAddress } from "../../models/listings/address";
import knex from "../../knex";

export async function storeAddress(address: DbAddress): Promise<DbAddress> {
  return knex(ADDRESS_TABLE_NAME).insert(address);
}

export async function getAddressById(
  id: string
): Promise<DbAddress | undefined> {
  return knex<DbAddress>(ADDRESS_TABLE_NAME).where({ id }).select().first();
}
