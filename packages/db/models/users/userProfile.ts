export const USER_PROFILE_TABLE_NAME = "user_profile";

export interface DbUserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  town?: string;
  dateOfBirth?: Date;
  about?: string;
  profilePhotoUrl?: string;
  employmentStatus?: string;
}
