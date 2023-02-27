import { UserLoginInfo, UserSignUpInfo } from "../../models";
import {
  createUserCredentials,
  createUserProfile,
  getUserCredentialsByUsername,
} from "@packages/db/services/users/userService";
import bcrypt from "bcrypt";
import { convertAPIUserSignupInfoToDbUserCredentials } from "../../convertors/users/userCredentials";
import { convertAPIUserSignupInfoToDbUserProfile } from "../../convertors/users/userProfile";
import { generateAccessToken } from "../../authentication/tokenAuthentication";

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
