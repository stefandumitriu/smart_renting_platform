import { UserSignUpInfo } from "../../models";
import { v4 as uuidv4 } from "uuid";
import { UserProfile } from "../../models/users/userProfile";

export function convertAPIUserSignupInfoToDbUserProfile(
  userSignupInfo: UserSignUpInfo,
  userCredentialsId: string
): UserProfile {
  return {
    id: uuidv4(),
    firstName: userSignupInfo.firstName,
    lastName: userSignupInfo.lastName,
    userId: userCredentialsId,
  };
}
