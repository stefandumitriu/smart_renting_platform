import { Contract, NewContact } from "../models/contract";
import { getApartmentById, getUserProfileById } from "@packages/db/services";
import { ContractStatus, DbContract } from "@packages/db/models";
import { v4 as uuidv4 } from "uuid";
import { convertDbUserProfileToAPIUserProfile } from "./users/userProfile";
import { convertDbApartmentToApartment } from "./listings/apartment";
import moment from "moment";

export function convertNewContractToDbContract(
  contract: NewContact
): DbContract {
  return {
    ...contract,
    id: uuidv4(),
    status: ContractStatus.Draft,
  };
}

export async function convertDbContractToContract(
  dbContract: DbContract
): Promise<Contract> {
  const dbLandlord = await getUserProfileById(dbContract.landlordId);
  const dbTenant = await getUserProfileById(dbContract.tenantId);
  const dbApartment = await getApartmentById(dbContract.apartmentId);
  if (!dbLandlord || !dbTenant || !dbApartment) {
    throw new Error("Resource not found");
  }
  return {
    ...dbContract,
    landlord: convertDbUserProfileToAPIUserProfile(dbLandlord),
    tenant: convertDbUserProfileToAPIUserProfile(dbTenant),
    apartment: await convertDbApartmentToApartment(dbApartment),
    startDate: moment(dbContract.startDate),
    endDate: dbContract.endDate ? moment(dbContract.endDate) : undefined,
  };
}
