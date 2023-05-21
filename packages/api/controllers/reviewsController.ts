import { Request, Response } from "express";
import {
  createUserReview,
  getLandlordReviews,
  getTenantReviews,
} from "@packages/db/services/userReviewService";
import {
  convertDbUserReviewToUserReview,
  convertNewUserReviewToDbUserReview,
} from "../convertors/userReview";
import { NewApartmentReview, NewUserReview } from "../models";
import {
  createApartmentReview,
  getApartmentReviews,
} from "@packages/db/services/apartmentReviewService";
import {
  convertDbApartmentReviewToApartmentReview,
  convertNewApartmentReviewToDbApartmentReview,
} from "../convertors/apartmentReview";

export const postUserReview = async (req: Request, res: Response) => {
  try {
    const dbUserReview = await createUserReview(
      convertNewUserReviewToDbUserReview(req.body as NewUserReview)
    );
    const userReview = await convertDbUserReviewToUserReview(dbUserReview);
    res.status(200).send(userReview);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const postApartmentReview = async (req: Request, res: Response) => {
  try {
    const dbApartmentReview = await createApartmentReview(
      convertNewApartmentReviewToDbApartmentReview(
        req.body as NewApartmentReview
      )
    );
    const apartmentReview = await convertDbApartmentReviewToApartmentReview(
      dbApartmentReview
    );
    res.status(200).send(apartmentReview);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getUserLandlordReviews = async (req: Request, res: Response) => {
  try {
    const dbUserReviews = await getLandlordReviews(req.params.id as string);
    const userReviews = await Promise.all(
      dbUserReviews.map(convertDbUserReviewToUserReview)
    );
    res.status(200).send(userReviews);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getUserTenantReviews = async (req: Request, res: Response) => {
  try {
    const dbUserReviews = await getTenantReviews(req.params.id as string);
    const userReviews = await Promise.all(
      dbUserReviews.map(convertDbUserReviewToUserReview)
    );
    res.status(200).send(userReviews);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getApartmentReviewsById = async (req: Request, res: Response) => {
  try {
    const dbApartmentReviews = await getApartmentReviews(
      req.params.id as string
    );
    const apartmentReviews = await Promise.all(
      dbApartmentReviews.map(convertDbApartmentReviewToApartmentReview)
    );
    res.status(200).send(apartmentReviews);
  } catch (e) {
    res.sendStatus(500);
    console.error(e);
  }
};
