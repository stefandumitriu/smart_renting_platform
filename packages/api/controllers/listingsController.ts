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
