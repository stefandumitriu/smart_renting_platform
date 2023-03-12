import { Request, Response } from "express";
import {
  getAllListings,
  getListing,
} from "../services/listings/listingService";

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
