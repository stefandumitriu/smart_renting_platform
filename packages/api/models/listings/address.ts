import { DbAddress } from "@packages/db/models/listings/address";

export type Address = DbAddress;

export type NewAddress = Omit<Address, "id">;
