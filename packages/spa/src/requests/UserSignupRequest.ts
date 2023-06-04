import { SignupFormValues } from "../components/landingPage/SignupForm";
import { axiosBaseInstance } from "./AxiosBaseInstance";
import { UserProfile } from "@packages/api/models/users/userProfile";

const USER_SIGNUP_PATH = "/users/signup";
const USER_LOGIN_PATH = "/users/login";
const USERS_PATH = "/users";

export const UserSignupRequest = async (
  values: SignupFormValues
): Promise<UserProfile> => {
  const res = await axiosBaseInstance.post(USER_SIGNUP_PATH, values);
  return res.data as UserProfile;
};

export const UserLoginRequest = async (
  userId: string
): Promise<UserProfile | undefined> => {
  return axiosBaseInstance
    .get(`${USER_LOGIN_PATH}/${userId}`)
    .then((res) => Promise.resolve(res.data))
    .catch((err) => Promise.resolve(undefined));
};

export const UpdateUserProfileRequest: (
  id: string,
  userProfile: Partial<Omit<UserProfile, "id">>
) => Promise<UserProfile> = async (id, userProfile) => {
  return axiosBaseInstance
    .patch(`${USERS_PATH}/profile/${id}`, userProfile)
    .then((res) => Promise.resolve(res.data as UserProfile));
};
