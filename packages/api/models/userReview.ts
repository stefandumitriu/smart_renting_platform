import { UserProfile } from "./users/userProfile";
import { DbUserReview } from "@packages/db";
import { Moment } from "moment";

interface UserReviewRelations {
  reviewer: UserProfile;
  user: UserProfile;
}

export type UserReview = Omit<DbUserReview, "created_at"> &
  UserReviewRelations & {
    created_at: Moment;
  };

export type NewUserReview = Omit<DbUserReview, "id" | "created_at">;
