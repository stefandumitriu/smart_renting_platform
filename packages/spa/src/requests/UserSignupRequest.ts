import { SignupFormValues } from "../components/landingPage/SignupForm";
import { axiosBaseInstance } from "./AxiosBaseInstance";
import { LoginFormValues } from "../components/landingPage/LoginForm";
import { UserProfile } from "@packages/api/models/users/userProfile";

const USER_SIGNUP_PATH = "/users/signup";
const USER_LOGIN_PATH = "/users/login";
const USERS_PATH = "/users";

export const UserSignupRequest = (values: SignupFormValues) => {
  axiosBaseInstance
    .post(USER_SIGNUP_PATH, values)
    .then((res) => console.log(res));
};

export const UserLoginRequest: (
  value: LoginFormValues
) => Promise<UserProfile> = async (values: LoginFormValues) => {
  return axiosBaseInstance
    .get(USER_LOGIN_PATH, {
      params: {
        email: values.email,
        password: values.password,
      },
    })
    .then((res) => Promise.resolve(res.data));
};

export const GetUserEmailRequest: (
  userCredentialsId: string
) => Promise<string> = async (userCredentialsId: string) => {
  return axiosBaseInstance
    .get(`${USERS_PATH}/${userCredentialsId}`)
    .then((res) => Promise.resolve(res.data as string));
};
