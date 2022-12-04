import { SignupFormValues } from "../components/landingPage/SignupForm";
import { axiosBaseInstance } from "./AxiosBaseInstance";
import {LoginFormValues} from "../components/landingPage/LoginForm";

const USER_SIGNUP_PATH = '/users/signup';
const USER_LOGIN_PATH = '/users/login';

export const UserSignupRequest = (values: SignupFormValues) => {
    axiosBaseInstance.post(USER_SIGNUP_PATH, values).then((res) => console.log(res))
}

export const UserLoginRequest = (values: LoginFormValues) => {
    axiosBaseInstance.get(USER_LOGIN_PATH, {
        params: {
            email: values.email,
            password: values.password
        }
    }).then((res) => console.log(res))
}