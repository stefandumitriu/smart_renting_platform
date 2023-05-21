import { APARTMENT_REVIEWS_TABLE_NAME, DbApartmentReview } from "../models";
import knex from "../knex";

export async function getApartmentReviewById(
  id: string
): Promise<DbApartmentReview | undefined> {
  return knex(APARTMENT_REVIEWS_TABLE_NAME).where({ id }).select().first();
}

export async function getApartmentReviews(
  apartmentId: string
): Promise<DbApartmentReview[]> {
  return knex<DbApartmentReview>(APARTMENT_REVIEWS_TABLE_NAME)
    .where({ apartmentId })
    .select();
}

export async function getApartmentReviewByReviewer(
  reviewerId: string,
  apartmentId: string
): Promise<DbApartmentReview | undefined> {
  return knex<DbApartmentReview>(APARTMENT_REVIEWS_TABLE_NAME)
    .where({ reviewerId, apartmentId })
    .select()
    .first();
}

export async function createApartmentReview(
  apartmentReview: Omit<DbApartmentReview, "created_at">
): Promise<DbApartmentReview> {
  await knex(APARTMENT_REVIEWS_TABLE_NAME).insert(apartmentReview);
  const createdApartmentReview = await getApartmentReviewById(
    apartmentReview.id
  );
  if (!createdApartmentReview) {
    throw new Error("Error on apartment review add");
  }
  return createdApartmentReview;
}
