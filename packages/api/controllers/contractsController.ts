import {
  getContractForLandlordByApartmentId,
  getContractForTenantUser,
  storeContract,
  updateContract,
} from "@packages/db/services/contractService";
import {
  convertContractToDbContract,
  convertDbContractToContract,
  convertNewContractToDbContract,
} from "../convertors/contract";
import { Contract, NewContact } from "../models/contract";
import { Request, Response } from "express";

export const createNewContract = async (req: Request, res: Response) => {
  try {
    const dbContract = await storeContract(
      convertNewContractToDbContract(req.body as NewContact)
    );
    const contract = await convertDbContractToContract(dbContract);
    res.status(200).send(contract);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const patchContract = async (req: Request, res: Response) => {
  try {
    const dbContract = await updateContract(
      req.params.id,
      convertContractToDbContract(req.body as Partial<Contract>)
    );
    const contract = await convertDbContractToContract(dbContract);
    res.status(200).send(contract);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getContractByTenantId = async (req: Request, res: Response) => {
  try {
    const dbContract = await getContractForTenantUser(
      req.params.tenantId as string
    );
    if (!dbContract) {
      throw new Error("Tenant contract not found for user");
    }
    const contract = await convertDbContractToContract(dbContract);
    res.status(200).send(contract);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const getLandlordApartmentContract = async (
  req: Request,
  res: Response
) => {
  try {
    const dbContract = await getContractForLandlordByApartmentId(
      req.params.apartmentId,
      req.params.landlordId
    );
    if (!dbContract) {
      throw new Error("Landlord apartment contract not found for user");
    }
    const contract = await convertDbContractToContract(dbContract);
    res.status(200).send(contract);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};
