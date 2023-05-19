import express from "express";
import {
  postApartmentReview,
  postUserReview,
} from "../controllers/reviewsController";

const reviewsRouter = express.Router();

reviewsRouter.post("/user-review", postUserReview);
reviewsRouter.post("/apartment-review", postApartmentReview);

export default reviewsRouter;
