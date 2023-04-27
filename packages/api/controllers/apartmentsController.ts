import { Request, Response } from "express";
import {
  deleteApartment,
  getApartmentById,
  getApartmentsByOwnerId,
  storeAddress,
  storeApartment,
  updateAddress,
  updateApartment,
} from "@packages/db/services";
import { convertDbApartmentToApartment } from "../convertors/listings/apartment";
import { Apartment, NewApartment } from "../models/listings/apartment";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export const getOwnerApartments = async (req: Request, res: Response) => {
  try {
    const dbApartments = await getApartmentsByOwnerId(
      req.query.ownerId as string
    );
    const apartments = await Promise.all(
      dbApartments.map(convertDbApartmentToApartment)
    );
    res.send(apartments);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

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

export const deleteApartmentById = async (req: Request, res: Response) => {
  try {
    await deleteApartment(req.params.id as string);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};

export const addApartment = async (req: Request, res: Response) => {
  try {
    const body = req.body as NewApartment;
    console.log(req.body, req.file);
    const addedAddress = await storeAddress({
      ...JSON.parse(body.address as unknown as string),
      id: uuidv4(),
    });
    const addedApartment = await storeApartment({
      ..._.omit(body, "address"),
      addressId: addedAddress.id,
      addressProof: req.file?.path,
      id: uuidv4(),
    });
    const apartment = await convertDbApartmentToApartment(addedApartment);
    res.send(apartment);
  } catch (e) {
    res.send(e);
    console.error(e);
  }
};
