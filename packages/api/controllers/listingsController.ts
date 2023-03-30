import { Request, Response } from "express";
import {
  getAllListings,
  getListing,
} from "../services/listings/listingService";
import {
  createNewFavouriteListing,
  getUserFavouriteListing,
} from "../services/listings/favouriteListingService";
import { deleteFavouriteListing } from "@packages/db/services/listings/favouriteListingService";
import { createNewApplication } from "../services/listings/applicationService";
import { NewApplication } from "../models/listings/application";
import { getTenantApplications } from "@packages/db/services/listings/applicationService";
import { getUserProfileById } from "@packages/db/services/users/userService";
import { convertDbUserProfileToAPIUserProfile } from "../convertors/users/userProfile";

export const getListings = async (req: Request, res: Response) => {
  try {
    const listings = await getAllListings();
    res.send(listings);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const listing = await getListing(req.params.id);
    res.send(listing);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};

export const createFavouriteListing = async (req: Request, res: Response) => {
  try {
    const favouriteListing = await createNewFavouriteListing(req.body);
    res.send(favouriteListing);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const getFavouriteListingsForUser = async (
  req: Request,
  res: Response
) => {
  try {
    const favouriteListings = await getUserFavouriteListing(
      req.query.userId as string
    );
    res.send(favouriteListings);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};

export const deleteFavouriteListingById = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.params.id) {
      throw new Error("Bad request");
    }
    await deleteFavouriteListing(req.params.id as string);
    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const createApplication = async (req: Request, res: Response) => {
  try {
    const storedApplication = await createNewApplication(
      req.body as NewApplication
    );
    res.send(storedApplication).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(400);
  }
};

export const getApplicationsByTenantId = async (
  req: Request,
  res: Response
) => {
  try {
    const dbApplications = await getTenantApplications(req.params.id as string);
    const applications = await Promise.all(
      dbApplications.map(async (application) => {
        const tenant = await getUserProfileById(application.tenantId);
        const landlord = await getUserProfileById(application.landlordId);
        const listing = await getListing(application.listingId);

        if (!tenant || !landlord || !listing) {
          throw new Error("Resource not found");
        }

        return {
          ...application,
          tenant: convertDbUserProfileToAPIUserProfile(tenant),
          landlord: convertDbUserProfileToAPIUserProfile(landlord),
          listing,
        };
      })
    );
    res.send(applications).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
