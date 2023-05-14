import { Apartment } from "./listings/apartment";
import { UserProfile } from "./users/userProfile";
import { DbContract } from "@packages/db";
import { Moment } from "moment";

interface ContractRelations {
  apartment: Apartment;
  landlord: UserProfile;
  tenant: UserProfile;
}

export type Contract = Omit<DbContract, "startDate" | "endDate"> &
  ContractRelations & {
    startDate: Moment;
    endDate?: Moment;
  };

export type NewContact = Omit<DbContract, "id" | "status"> & {
  startDate: Moment;
  endDate?: Moment;
};
