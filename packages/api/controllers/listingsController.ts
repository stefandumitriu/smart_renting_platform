import { Request, Response } from "express";
import {
  getAllListings,
  getListing,
  getUsersListings,
} from "../services/listings/listingService";
import {
  createNewFavouriteListing,
  getUserFavouriteListing,
} from "../services/listings/favouriteListingService";
import { deleteFavouriteListing } from "@packages/db/services/listings/favouriteListingService";
import { createNewApplication } from "../services/listings/applicationService";
import { NewApplication } from "../models/listings/application";
import {
  deleteApplication,
  getApplicationsForListing,
  getLandlordApplications,
  getTenantApplications,
  updateApplication,
} from "@packages/db/services/listings/applicationService";
import { convertDbApplicationToAPIApplication } from "../convertors/listings/application";
import {
  deleteListingById,
  storeListing,
  updateApartment,
  updateListing,
} from "@packages/db/services";
import { NewListing } from "../models/listings/listing";
import { v4 as uuidv4 } from "uuid";
import { convertDbListingToAPIListing } from "../convertors/listings/listing";
import _ from "lodash";
import { ApartmentStatus } from "@packages/db/models/listings/apartment";
import { DbApplication } from "@packages/db";
import similarListingsClassifier from "../recommender-system/similarListingsClassifier";

export const addListing = async (req: Request, res: Response) => {
  try {
    const filepaths = ((req.files || []) as any[]).map((file: any) => file.key);
    const dbListing = await storeListing({
      ..._.omit(req.body as NewListing, "photos"),
      photosUrl: filepaths || undefined,
      id: uuidv4(),
    });
    await updateApartment((req.body as NewListing).apartmentId, {
      status: ApartmentStatus.Listed,
    });
    const listing = await convertDbListingToAPIListing(dbListing);
    res.send(listing);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const patchListing = async (req: Request, res: Response) => {
  try {
    const dbListing = await updateListing(req.params.id as string, {
      ...req.body,
      lastUpdated: new Date(),
    });
    const listing = await convertDbListingToAPIListing(dbListing);
    res.send(listing);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const apartmentId = (await getListing(req.params.id as string)).apartmentId;
    await deleteListingById(req.params.id as string);
    await updateApartment(apartmentId, { status: ApartmentStatus.Available });
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

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

export const getSimilarListings = async (req: Request, res: Response) => {
  try {
    const refListing = await getListing(req.params.id as string);
    const listings = await getAllListings();
    const similarListings = similarListingsClassifier(refListing, listings, 5);
    res.status(200).send(similarListings);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getUserListings = async (req: Request, res: Response) => {
  try {
    const listings = await getUsersListings(req.params.id as string);
    res.send(listings).status(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
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

export const patchApplication = async (req: Request, res: Response) => {
  try {
    const dbApplication = await updateApplication(
      req.params.id as string,
      req.body as Partial<DbApplication>
    );
    const application = convertDbApplicationToAPIApplication(dbApplication);
    res.status(200).send(application);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
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
        return convertDbApplicationToAPIApplication(application);
      })
    );
    res.send(applications).status(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};

export const getApplicationsByLandlordId = async (
  req: Request,
  res: Response
) => {
  try {
    const dbApplications = await getLandlordApplications(
      req.params.id as string
    );
    const applications = await Promise.all(
      dbApplications.map(async (application) => {
        return convertDbApplicationToAPIApplication(application);
      })
    );
    res.send(applications).status(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getApplicationByListingId = async (
  req: Request,
  res: Response
) => {
  try {
    const dbApplications = await getApplicationsForListing(
      req.params.listingId as string
    );
    const applications = await Promise.all(
      dbApplications.map(convertDbApplicationToAPIApplication)
    );
    res.send(applications);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const deleteApplicationById = async (req: Request, res: Response) => {
  try {
    await deleteApplication(req.params.id as string);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
};
