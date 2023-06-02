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
import {
  geocode,
  GoogleGeocodingLatLong,
} from "@packages/google-maps-service/geocoding";
import { generateLatLong } from "@packages/google-maps-service/randomize";

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
    let latLong: GoogleGeocodingLatLong | undefined = await geocode(
      body.address.streetType,
      body.address.streetName,
      body.address.streetNumber
    );
    await updateAddress(body.addressId, {
      ...body.address,
      lat: latLong?.lat,
      long: latLong?.long,
    });
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
    const address = JSON.parse(body.address as unknown as string);
    let latLong: GoogleGeocodingLatLong | undefined = await geocode(
      address.streetType,
      address.streetName,
      address.streetNumber
    );
    console.log(latLong);
    if (!latLong) {
      latLong = generateLatLong();
    }
    const addedAddress = await storeAddress({
      ...address,
      id: uuidv4(),
      lat: latLong.lat,
      long: latLong.long,
    });
    const addedApartment = await storeApartment({
      ..._.omit(body, "address"),
      addressId: addedAddress.id,
      addressProof: (req.file as any).key,
      id: uuidv4(),
    });
    const apartment = await convertDbApartmentToApartment(addedApartment);
    res.send(apartment);
  } catch (e) {
    res.send(e);
    console.error(e);
  }
};
