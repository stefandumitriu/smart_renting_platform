import express from "express";
import {
  getApartmentReviewsById,
  getUserLandlordReviews,
  getUserTenantReviews,
  postApartmentReview,
  postUserReview,
} from "../controllers/reviewsController";

const reviewsRouter = express.Router();

reviewsRouter.post("/user-review", postUserReview);
reviewsRouter.post("/apartment-review", postApartmentReview);
reviewsRouter.get("/user-review/:id/landlord", getUserLandlordReviews);
reviewsRouter.get("/user-review/:id/tenant", getUserTenantReviews);
reviewsRouter.get("/apartment-review/:id", getApartmentReviewsById);

export default reviewsRouter;
