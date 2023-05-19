import { getUserProfileById } from "@packages/db/services";
import { DbUserReview } from "@packages/db/models";
import { NewUserReview, UserReview } from "../models";
import { convertDbUserProfileToAPIUserProfile } from "./users/userProfile";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export async function convertDbUserReviewToUserReview(
  dbUserReview: DbUserReview
): Promise<UserReview> {
  const dbReviewer = await getUserProfileById(dbUserReview.reviewerId);
  const dbUser = await getUserProfileById(dbUserReview.userId);
  if (!dbReviewer || !dbUser) {
    throw new Error("Error on user review convert");
  }
  return {
    ...dbUserReview,
    reviewer: convertDbUserProfileToAPIUserProfile(dbReviewer),
    user: convertDbUserProfileToAPIUserProfile(dbUser),
    created_at: moment(dbUserReview.created_at),
  };
}

export function convertNewUserReviewToDbUserReview(
  userReview: NewUserReview
): Omit<DbUserReview, "created_at"> {
  return {
    ...userReview,
    id: uuidv4(),
  };
}
