import express from "express";
import {
  createApplication,
  createFavouriteListing,
  deleteApplicationById,
  deleteFavouriteListingById,
  getApplicationsByLandlordId,
  getApplicationsByTenantId,
  getFavouriteListingsForUser,
  getListingById,
  getListings,
  getUserListings,
} from "../controllers/listingsController";

const listingsRouter = express.Router();

listingsRouter.get("", getListings);
listingsRouter.get("/favourite-listing", getFavouriteListingsForUser);
listingsRouter.get("/user/:id", getUserListings);
listingsRouter.get("/:id", getListingById);
listingsRouter.post("/favourite-listing", createFavouriteListing);
listingsRouter.delete("/favourite-listing/:id", deleteFavouriteListingById);
listingsRouter.post("/applications", createApplication);
listingsRouter.get("/applications/tenant/:id", getApplicationsByTenantId);
listingsRouter.get("/applications/landlord/:id", getApplicationsByLandlordId);
listingsRouter.delete("/applications/:id", deleteApplicationById);

export default listingsRouter;
