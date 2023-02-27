import { DbUserCredentials, USER_CREDENTIALS_TABLE_NAME } from "../../models";
import knex from "../../knex";
import { DbUserProfile, USER_PROFILE_TABLE_NAME } from "../../models";

export async function createUserCredentials(
  userCredentials: DbUserCredentials
): Promise<void> {
  await knex(USER_CREDENTIALS_TABLE_NAME).insert(userCredentials, ["id"]);
}

export async function getUserCredentialsByUsername(
  username: string
): Promise<DbUserCredentials | undefined> {
  return knex<DbUserCredentials>(USER_CREDENTIALS_TABLE_NAME)
    .select()
    .where("email", username)
    .first();
}

export async function createUserProfile(
  userProfile: DbUserProfile
): Promise<string> {
  return knex(USER_PROFILE_TABLE_NAME).insert(userProfile).returning("id");
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
