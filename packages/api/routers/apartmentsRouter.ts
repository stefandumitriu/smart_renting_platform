import express from "express";
import {
  getApartment,
  patchApartment,
} from "../controllers/apartmentsController";

const apartmentsRouter = express.Router();

apartmentsRouter.get("/:id", getApartment);
apartmentsRouter.patch("/:id", patchApartment);

export default apartmentsRouter;
