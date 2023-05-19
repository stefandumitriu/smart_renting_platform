import { getApartmentById, getUserProfileById } from "@packages/db/services";
import { DbApartmentReview } from "@packages/db/models";
import { ApartmentReview, NewApartmentReview } from "../models";
import { convertDbUserProfileToAPIUserProfile } from "./users/userProfile";
import { convertDbApartmentToApartment } from "./listings/apartment";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export async function convertDbApartmentReviewToApartmentReview(
  dbApartmentReview: DbApartmentReview
): Promise<ApartmentReview> {
  const dbReviewer = await getUserProfileById(dbApartmentReview.reviewerId);
  const dbApartment = await getApartmentById(dbApartmentReview.apartmentId);
  if (!dbReviewer || !dbApartment) {
    throw new Error("Error on apt review convert");
  }
  const reviewer = convertDbUserProfileToAPIUserProfile(dbReviewer);
  const apartment = await convertDbApartmentToApartment(dbApartment);
  return {
    ...dbApartmentReview,
    reviewer,
    apartment,
    created_at: moment(dbApartmentReview.created_at),
  };
}

export function convertNewApartmentReviewToDbApartmentReview(
  apartmentReview: NewApartmentReview
): Omit<DbApartmentReview, "created_at"> {
  return {
    ...apartmentReview,
    id: uuidv4(),
  };
}
