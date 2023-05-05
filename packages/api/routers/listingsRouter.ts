import express from "express";
import {
  addListing,
  createApplication,
  createFavouriteListing,
  deleteApplicationById,
  deleteFavouriteListingById,
  deleteListing,
  getApplicationsByLandlordId,
  getApplicationsByTenantId,
  getFavouriteListingsForUser,
  getListingById,
  getListings,
  getUserListings,
} from "../controllers/listingsController";
import multer from "multer";
import path from "path";

const listingsRouter = express.Router();

const imageUpload = multer.diskStorage({
  destination: "../../local_storage/listingPhotos",
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

listingsRouter.post(
  "",
  multer({ storage: imageUpload }).array("photos"),
  addListing
);
listingsRouter.get("", getListings);
listingsRouter.get("/favourite-listing", getFavouriteListingsForUser);
listingsRouter.get("/user/:id", getUserListings);
listingsRouter.get("/:id", getListingById);
listingsRouter.delete("/:id", deleteListing);
listingsRouter.post("/favourite-listing", createFavouriteListing);
listingsRouter.delete("/favourite-listing/:id", deleteFavouriteListingById);
listingsRouter.post("/applications", createApplication);
listingsRouter.get("/applications/tenant/:id", getApplicationsByTenantId);
listingsRouter.get("/applications/landlord/:id", getApplicationsByLandlordId);
listingsRouter.delete("/applications/:id", deleteApplicationById);

export default listingsRouter;
