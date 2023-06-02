import express from "express";
import {
  addApartment,
  deleteApartmentById,
  getApartment,
  getOwnerApartments,
  patchApartment,
} from "../controllers/apartmentsController";
import { s3UploadMiddleware } from "../aws/s3Uploader";

const apartmentsRouter = express.Router();

apartmentsRouter.post(
  "/",
  s3UploadMiddleware("address-proof").single("addressProof"),
  addApartment
);
apartmentsRouter.get("/", getOwnerApartments);
apartmentsRouter.get("/:id", getApartment);
apartmentsRouter.patch("/:id", patchApartment);
apartmentsRouter.delete("/:id", deleteApartmentById);

export default apartmentsRouter;
