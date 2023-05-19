import { Request, Response } from "express";
import { createUserReview } from "@packages/db/services/userReviewService";
import {
  convertDbUserReviewToUserReview,
  convertNewUserReviewToDbUserReview,
} from "../convertors/userReview";
import { NewApartmentReview, NewUserReview } from "../models";
import { createApartmentReview } from "@packages/db/services/apartmentReviewService";
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
    console.log(userReview);
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
    console.log(apartmentReview);
    res.status(200).send(apartmentReview);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
