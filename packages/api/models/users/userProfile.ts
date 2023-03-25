import { DbUserProfile } from "@packages/db/models/users/userProfile";
import { Moment } from "moment";

export type UserProfile = Omit<DbUserProfile, "dateOfBirth"> & {
  dateOfBirth?: Moment;
};
