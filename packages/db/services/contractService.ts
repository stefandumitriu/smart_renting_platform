import { CONTRACTS_TABLE_NAME, DbContract } from "../models";
import knex from "../knex";

export async function getContractById(
  id: string
): Promise<DbContract | undefined> {
  return knex<DbContract>(CONTRACTS_TABLE_NAME).where({ id }).select().first();
}

export async function storeContract(contract: DbContract): Promise<DbContract> {
  await knex(CONTRACTS_TABLE_NAME).insert(contract);
  const dbContract = await getContractById(contract.id);
  if (!dbContract) {
    throw new Error("Insert contract operation failed");
  }
  return dbContract;
}
