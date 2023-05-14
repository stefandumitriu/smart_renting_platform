import express from "express";
import { createNewContract } from "../controllers/contractsController";

const contractsRouter = express.Router();
contractsRouter.post("/", createNewContract);

export default contractsRouter;
