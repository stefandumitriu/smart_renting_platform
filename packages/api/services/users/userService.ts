import { UserSignUpInfo } from "../../models";
import {
  createUserProfile,
  updateUserProfile,
} from "@packages/db/services/users/userService";
import {
  convertAPIUserProfileToDbUserProfile,
  convertDbUserProfileToAPIUserProfile,
} from "../../convertors/users/userProfile";
import { UserProfile } from "../../models/users/userProfile";
import { v4 as uuidv4 } from "uuid";
import { DbUserProfile } from "@packages/db";

export async function createNewUser(
  body: UserSignUpInfo
): Promise<DbUserProfile> {
  return createUserProfile({ ...body, id: uuidv4() });
}

export async function updateUser(
  id: string,
  userProfile: Omit<UserProfile, "id">
): Promise<UserProfile> {
  const updatedUserProfile = await updateUserProfile(
    id,
    convertAPIUserProfileToDbUserProfile(userProfile)
  );
  if (!updatedUserProfile) {
    throw new Error("Error on db update");
  }
  return convertDbUserProfileToAPIUserProfile(updatedUserProfile);
}
