import express from "express";
import {
  addApartment,
  getApartment,
  patchApartment,
} from "../controllers/apartmentsController";

const apartmentsRouter = express.Router();

apartmentsRouter.post("/", addApartment);
apartmentsRouter.get("/:id", getApartment);
apartmentsRouter.patch("/:id", patchApartment);

export default apartmentsRouter;
