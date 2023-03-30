import express from "express";
import {
  createApplication,
  createFavouriteListing,
  deleteFavouriteListingById,
  getApplicationsByTenantId,
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
listingsRouter.post("/applications", createApplication);
listingsRouter.get("/applications/tenant/:id", getApplicationsByTenantId);

export default listingsRouter;
