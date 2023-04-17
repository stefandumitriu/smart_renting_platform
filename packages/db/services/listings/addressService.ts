import { ADDRESS_TABLE_NAME, DbAddress } from "../../models/listings/address";
import knex from "../../knex";

export async function storeAddress(address: DbAddress): Promise<DbAddress> {
  await knex(ADDRESS_TABLE_NAME).insert(address);
  const addedAddress = await getAddressById(address.id);
  if (!addedAddress) {
    throw new Error("Error on insert");
  }
  return addedAddress;
}

export async function getAddressById(
  id: string
): Promise<DbAddress | undefined> {
  return knex<DbAddress>(ADDRESS_TABLE_NAME).where({ id }).select().first();
}

export async function updateAddress(
  id: string,
  address: Partial<DbAddress>
): Promise<DbAddress> {
  await knex(ADDRESS_TABLE_NAME).where({ id }).update(address);
  return (await getAddressById(id)) as DbAddress;
}
