import { SignupFormValues } from "../components/landingPage/SignupForm";
import { axiosBaseInstance } from "./AxiosBaseInstance";

const USER_SIGNUP_PATH = '/users/signup'

const UserSignupRequest = (values: SignupFormValues) => {
    axiosBaseInstance.post(USER_SIGNUP_PATH, values).then((res) => console.log(res))
}

export default UserSignupRequest;