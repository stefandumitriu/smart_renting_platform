import { Request, Response } from "express";
import { getAllListings } from "../services/listings/listingService";

export const getListings = async (req: Request, res: Response) => {
  try {
    const listings = await getAllListings();
    res.send(listings);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
};
