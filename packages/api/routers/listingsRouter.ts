import express from "express";
import {
  createFavouriteListing,
  deleteFavouriteListingById,
  getFavouriteListingsForUser,
  getListingById,
  getListings,
} from "../controllers/listingsController";

const listingsRouter = express.Router();

listingsRouter.get("", getListings);
listingsRouter.get("/favourite-listing", getFavouriteListingsForUser);
listingsRouter.get("/:id", getListingById);
listingsRouter.post("/favourite-listing", createFavouriteListing);
listingsRouter.delete("/favourite-listing/:id", deleteFavouriteListingById);

export default listingsRouter;
