export const USER_PROFILE_TABLE_NAME = "user_profile";

export interface DbUserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
}
