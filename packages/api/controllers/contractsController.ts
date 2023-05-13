import { storeContract } from "@packages/db/services/contractService";
import {
  convertDbContractToContract,
  convertNewContractToDbContract,
} from "../convertors/contract";
import { NewContact } from "../models/contract";
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
