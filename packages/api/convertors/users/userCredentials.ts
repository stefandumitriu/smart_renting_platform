import { UserSignUpInfo } from "../../models";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { UserCredentials } from "../../models/users/userCredentials";

export async function convertAPIUserSignupInfoToDbUserCredentials(
  userSignupInfo: UserSignUpInfo
): Promise<UserCredentials> {
  return {
    id: uuidv4(),
    username: userSignupInfo.email,
    password: await bcrypt.hash(userSignupInfo.password, 10),
  };
}
