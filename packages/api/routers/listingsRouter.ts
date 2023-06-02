import express from "express";
import {
  addListing,
  createApplication,
  createFavouriteListing,
  deleteApplicationById,
  deleteFavouriteListingById,
  deleteListing,
  getApplicationByListingId,
  getApplicationsByLandlordId,
  getApplicationsByTenantId,
  getFavouriteListingsForUser,
  getListingById,
  getListings,
  getUserListings,
  patchApplication,
  patchListing,
} from "../controllers/listingsController";
import { s3UploadMiddleware } from "../aws/s3Uploader";

const listingsRouter = express.Router();

listingsRouter.post(
  "",
  s3UploadMiddleware("listing-photo").array("photos"),
  addListing
);
listingsRouter.get("", getListings);
listingsRouter.get("/favourite-listing", getFavouriteListingsForUser);
listingsRouter.get("/user/:id", getUserListings);
listingsRouter.get("/:listingId/applications", getApplicationByListingId);
listingsRouter.get("/:id", getListingById);
listingsRouter.patch("/:id", patchListing);
listingsRouter.delete("/:id", deleteListing);
listingsRouter.post("/favourite-listing", createFavouriteListing);
listingsRouter.delete("/favourite-listing/:id", deleteFavouriteListingById);
listingsRouter.post("/applications", createApplication);
listingsRouter.get("/applications/tenant/:id", getApplicationsByTenantId);
listingsRouter.get("/applications/landlord/:id", getApplicationsByLandlordId);
listingsRouter.patch("/applications/:id", patchApplication);
listingsRouter.delete("/applications/:id", deleteApplicationById);

export default listingsRouter;
