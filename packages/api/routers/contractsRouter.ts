import express from "express";
import {
  createNewContract,
  getContractByTenantId,
  getLandlordApartmentContract,
  patchContract,
} from "../controllers/contractsController";

const contractsRouter = express.Router();
contractsRouter.get("/tenant/:tenantId", getContractByTenantId);
contractsRouter.get(
  "/landlord/:landlordId/apartment/:apartmentId",
  getLandlordApartmentContract
);
contractsRouter.patch("/:id", patchContract);
contractsRouter.post("/", createNewContract);

export default contractsRouter;
