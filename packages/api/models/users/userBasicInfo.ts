export interface UserSignUpInfo {
  userId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface UserLoginInfo {
  email: string;
  password: string;
}
