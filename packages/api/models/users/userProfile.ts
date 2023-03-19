import { DbUserProfile } from "@packages/db/models/users/userProfile";
import { Dayjs } from "dayjs";

export type UserProfile = Omit<DbUserProfile, "dateOfBirth"> & {
  dateOfBirth?: Dayjs;
};
