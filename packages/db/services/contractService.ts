import { CONTRACTS_TABLE_NAME, ContractStatus, DbContract } from "../models";
import knex from "../knex";

export async function getContractById(
  id: string
): Promise<DbContract | undefined> {
  return knex<DbContract>(CONTRACTS_TABLE_NAME).where({ id }).select().first();
}

export async function getContractForTenantUser(
  tenantId: string
): Promise<DbContract | undefined> {
  return knex<DbContract>(CONTRACTS_TABLE_NAME)
    .where({ tenantId, status: ContractStatus.Ongoing })
    .orWhere({ tenantId, status: ContractStatus.Draft })
    .select()
    .first();
}

export async function getContractForLandlordByApartmentId(
  apartmentId: string,
  landlordId: string
): Promise<DbContract | undefined> {
  return knex<DbContract>(CONTRACTS_TABLE_NAME)
    .where({ apartmentId, landlordId })
    .whereNot({ status: ContractStatus.Closed })
    .select()
    .first();
}

export async function storeContract(contract: DbContract): Promise<DbContract> {
  await knex(CONTRACTS_TABLE_NAME).insert(contract);
  const dbContract = await getContractById(contract.id);
  if (!dbContract) {
    throw new Error("Insert contract operation failed");
  }
  return dbContract;
}

export async function updateContract(
  id: string,
  contract: Partial<DbContract>
): Promise<DbContract> {
  await knex(CONTRACTS_TABLE_NAME).where({ id }).update(contract);
  const dbContract = await getContractById(id);
  if (!dbContract) {
    throw new Error("Update contract operation failed");
  }
  return dbContract;
}
