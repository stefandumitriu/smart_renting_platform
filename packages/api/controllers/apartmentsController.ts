import { Request, Response } from "express";
import {
  getApartmentById,
  updateAddress,
  updateApartment,
} from "@packages/db/services";
import { convertDbApartmentToApartment } from "../convertors/listings/apartment";
import { Apartment } from "../models/listings/apartment";
import _ from "lodash";

export const getApartment = async (req: Request, res: Response) => {
  try {
    const dbApartment = await getApartmentById(req.params.id);
    if (!dbApartment) {
      throw Error("Apartment was not found");
    }
    const apartment = await convertDbApartmentToApartment(dbApartment);
    res.send(apartment);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const patchApartment = async (req: Request, res: Response) => {
  try {
    const body = req.body as Apartment;
    await updateAddress(body.addressId, body.address);
    const updatedDbApartment = await updateApartment(
      req.params.id as string,
      _.omit(body, ["address", "owner", "id"])
    );
    const apartment = await convertDbApartmentToApartment(updatedDbApartment);
    res.send(apartment);
  } catch (e) {
    res.send(e).sendStatus(500);
    console.error(e);
  }
};
