import { DbUserProfile, USER_PROFILE_TABLE_NAME } from "../../models";
import knex from "../../knex";

export async function createUserProfile(
  userProfile: DbUserProfile
): Promise<DbUserProfile> {
  await knex(USER_PROFILE_TABLE_NAME).insert(userProfile).returning("id");
  const createdUserProfile = await knex(USER_PROFILE_TABLE_NAME)
    .select()
    .where({ id: userProfile.id })
    .first();
  if (!createdUserProfile) {
    throw new Error("Error on creating user profile");
  }
  return createdUserProfile;
}

export async function getUserProfileById(
  id: string
): Promise<DbUserProfile | undefined> {
  return knex<DbUserProfile>(USER_PROFILE_TABLE_NAME)
    .select()
    .where("id", id)
    .first();
}

export async function getUserProfileByCredentialsId(
  userId: string
): Promise<DbUserProfile | undefined> {
  return knex<DbUserProfile>(USER_PROFILE_TABLE_NAME)
    .select()
    .where("userId", userId)
    .first();
}

export async function updateUserProfile(
  id: string,
  userProfile: Partial<DbUserProfile>
): Promise<DbUserProfile | undefined> {
  await knex<DbUserProfile>(USER_PROFILE_TABLE_NAME)
    .where({ id })
    .update(userProfile);
  return knex<DbUserProfile>(USER_PROFILE_TABLE_NAME)
    .select()
    .where({ id })
    .first();
}
