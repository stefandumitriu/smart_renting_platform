import express from "express";
import {
  fetchAllApartmentReviews,
  fetchAllLandlordReviews,
  fetchApartmentReviewByReviewerId,
  fetchUserReviewByReviewerId,
  getApartmentReviewsById,
  getUserLandlordReviews,
  getUserTenantReviews,
  postApartmentReview,
  postUserReview,
} from "../controllers/reviewsController";

const reviewsRouter = express.Router();

reviewsRouter.post("/user-review", postUserReview);
reviewsRouter.get("/user-review", fetchAllLandlordReviews);
reviewsRouter.get("/apartment-review", fetchAllApartmentReviews);
reviewsRouter.post("/apartment-review", postApartmentReview);
reviewsRouter.get("/user-review/:id/landlord", getUserLandlordReviews);
reviewsRouter.get("/user-review/:id/tenant", getUserTenantReviews);
reviewsRouter.get(
  "/user-review/:id/reviewer/:reviewerId",
  fetchUserReviewByReviewerId
);
reviewsRouter.get("/apartment-review/:id", getApartmentReviewsById);
reviewsRouter.get(
  "/apartment-review/:id/reviewer/:reviewerId",
  fetchApartmentReviewByReviewerId
);

export default reviewsRouter;
