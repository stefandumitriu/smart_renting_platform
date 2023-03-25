import { UserSignUpInfo } from "../../models";
import { v4 as uuidv4 } from "uuid";
import { UserProfile } from "../../models/users/userProfile";
import { DbUserProfile } from "@packages/db";
import moment from "moment";

export function convertAPIUserSignupInfoToDbUserProfile(
  userSignupInfo: UserSignUpInfo,
  userCredentialsId: string
): DbUserProfile {
  return {
    id: uuidv4(),
    firstName: userSignupInfo.firstName,
    lastName: userSignupInfo.lastName,
    userId: userCredentialsId,
  };
}

export function convertDbUserProfileToAPIUserProfile(
  dbUserProfile: DbUserProfile
): UserProfile {
  return {
    ...dbUserProfile,
    dateOfBirth: dbUserProfile.dateOfBirth
      ? moment(dbUserProfile.dateOfBirth)
      : undefined,
  };
}

export function convertAPIUserProfileToDbUserProfile(
  userProfile: Partial<UserProfile>
): Partial<DbUserProfile> {
  return {
    ...userProfile,
    dateOfBirth: userProfile.dateOfBirth
      ? new Date(userProfile.dateOfBirth as unknown as string)
      : undefined,
  };
}
