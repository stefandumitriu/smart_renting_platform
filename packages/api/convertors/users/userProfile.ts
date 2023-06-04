import { UserProfile } from "../../models/users/userProfile";
import { DbUserProfile } from "@packages/db";
import moment from "moment";

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
