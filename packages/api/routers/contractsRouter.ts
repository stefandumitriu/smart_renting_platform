import express from "express";
import {
  createNewContract,
  getContractByTenantId,
} from "../controllers/contractsController";

const contractsRouter = express.Router();
contractsRouter.get("/tenant/:tenantId", getContractByTenantId);
contractsRouter.post("/", createNewContract);

export default contractsRouter;
