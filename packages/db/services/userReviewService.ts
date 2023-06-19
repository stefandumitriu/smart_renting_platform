import { DbUserReview, ReviewType, USER_REVIEWS_TABLE_NAME } from "../models";
import knex from "../knex";

export async function getUserReviewById(
  id: string
): Promise<DbUserReview | undefined> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ id })
    .select()
    .first();
}

export async function getLandlordReviews(
  userId: string
): Promise<DbUserReview[]> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ userId, type: ReviewType.Landlord })
    .select();
}

export async function getTenantReviews(
  userId: string
): Promise<DbUserReview[]> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ userId, type: ReviewType.Tenant })
    .select();
}

export async function getReviewByReviewerAndUserIds(
  reviewerId: string,
  userId: string,
  type: ReviewType
): Promise<DbUserReview | undefined> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ reviewerId, userId, type })
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

export async function getAllLandlordReviews(): Promise<DbUserReview[]> {
  return knex<DbUserReview>(USER_REVIEWS_TABLE_NAME)
    .where({ type: ReviewType.Landlord })
    .select();
}
