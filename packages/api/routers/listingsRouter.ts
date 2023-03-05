import express from "express";
import { getListings } from "../controllers/listingsController";

const listingsRouter = express.Router();

listingsRouter.get("", getListings);

export default listingsRouter;
