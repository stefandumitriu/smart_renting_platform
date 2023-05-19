import { DbUserReview, USER_REVIEWS_TABLE_NAME } from "../models";
import knex from "../knex";

export async function getUserReviewById(
  id: string
): Promise<DbUserReview | undefined> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ id })
    .select()
    .first();
}

export async function createUserReview(
  userReview: Omit<DbUserReview, "created_at">
): Promise<DbUserReview> {
  await knex<DbUserReview>(USER_REVIEWS_TABLE_NAME).insert(userReview);
  const createdUserReview = await getUserReviewById(userReview.id);
  if (!createdUserReview) {
    throw new Error("Error on user review add");
  }
  return createdUserReview;
}
