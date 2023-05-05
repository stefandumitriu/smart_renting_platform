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
  getLandlordApplications,
  getTenantApplications,
} from "@packages/db/services/listings/applicationService";
import { convertDbApplicationToAPIApplication } from "../convertors/listings/application";
import { deleteListingById, storeListing } from "@packages/db/services";
import { NewListing } from "../models/listings/listing";
import { v4 as uuidv4 } from "uuid";
import { convertDbListingToAPIListing } from "../convertors/listings/listing";
import _ from "lodash";

export const addListing = async (req: Request, res: Response) => {
  try {
    const filepaths = ((req.files || []) as Express.Multer.File[]).map(
      (file: Express.Multer.File) => file.path
    );
    const dbListing = await storeListing({
      ..._.omit(req.body as NewListing, "photos"),
      photosUrl: filepaths,
      id: uuidv4(),
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
    await deleteListingById(req.params.id as string);
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

export const deleteApplicationById = async (req: Request, res: Response) => {
  try {
    await deleteApplication(req.params.id as string);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(404);
  }
};
