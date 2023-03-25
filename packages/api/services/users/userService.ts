import { UserLoginInfo, UserSignUpInfo } from "../../models";
import {
  createUserCredentials,
  createUserProfile,
  getUserCredentialsByUsername,
  updateUserProfile,
} from "@packages/db/services/users/userService";
import bcrypt from "bcrypt";
import { convertAPIUserSignupInfoToDbUserCredentials } from "../../convertors/users/userCredentials";
import {
  convertAPIUserProfileToDbUserProfile,
  convertAPIUserSignupInfoToDbUserProfile,
  convertDbUserProfileToAPIUserProfile,
} from "../../convertors/users/userProfile";
import { generateAccessToken } from "../../authentication/tokenAuthentication";
import { UserProfile } from "../../models/users/userProfile";
import { DbUserProfile } from "@packages/db";

export async function createNewUser(body: UserSignUpInfo): Promise<string> {
  const dbUserCredentials = await convertAPIUserSignupInfoToDbUserCredentials(
    body
  );
  await createUserCredentials(dbUserCredentials);
  const dbUserProfile = convertAPIUserSignupInfoToDbUserProfile(
    body,
    dbUserCredentials.id
  );
  await createUserProfile(dbUserProfile);
  return generateAccessToken(dbUserCredentials.id);
}

export async function getUserToken(
  body: UserLoginInfo
): Promise<string | undefined> {
  const userCredentials = await getUserCredentialsByUsername(body.email);
  if (!userCredentials) {
    return undefined;
  }
  const validPassword = await bcrypt.compare(
    body.password,
    userCredentials.password
  );
  if (validPassword) {
    return generateAccessToken(userCredentials.id);
  }
  return undefined;
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
