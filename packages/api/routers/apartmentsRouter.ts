import express from "express";
import { getApartment } from "../controllers/apartmentsController";

const apartmentsRouter = express.Router();

apartmentsRouter.get("/:id", getApartment);

export default apartmentsRouter;
