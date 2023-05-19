import { UserProfile } from "./users/userProfile";
import { Apartment } from "./listings/apartment";
import { DbApartmentReview } from "@packages/db";
import { Moment } from "moment";

interface ApartmentReviewRelations {
  reviewer: UserProfile;
  apartment: Apartment;
}

export type ApartmentReview = Omit<DbApartmentReview, "created_at"> &
  ApartmentReviewRelations & {
    created_at: Moment;
  };

export type NewApartmentReview = Omit<DbApartmentReview, "id" | "created_at">;
