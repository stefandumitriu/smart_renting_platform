import express from "express";
import {
  addApartment,
  deleteApartmentById,
  getApartment,
  getOwnerApartments,
  patchApartment,
} from "../controllers/apartmentsController";
import multer from "multer";
import * as path from "path";

const apartmentsRouter = express.Router();
const imageUpload = multer.diskStorage({
  destination: "../../local_storage/addressProof",
  filename(
    req: Express.Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ) {
    const filename =
      file.originalname.split(".")[0] +
      Math.floor(Math.random() * 1000).toString() +
      path.extname(file.originalname);
    callback(null, filename);
  },
});

apartmentsRouter.post(
  "/",
  multer({ storage: imageUpload }).single("addressProof"),
  addApartment
);
apartmentsRouter.get("/", getOwnerApartments);
apartmentsRouter.get("/:id", getApartment);
apartmentsRouter.patch("/:id", patchApartment);
apartmentsRouter.delete("/:id", deleteApartmentById);

export default apartmentsRouter;
