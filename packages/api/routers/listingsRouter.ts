import express from "express";
import { getListingById, getListings } from "../controllers/listingsController";

const listingsRouter = express.Router();

listingsRouter.get("", getListings);
listingsRouter.get("/:id", getListingById);

export default listingsRouter;
