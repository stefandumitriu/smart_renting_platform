import { DbAddress } from "./address";
import { DbUserBasicInfo } from "../users";

export const APARTMENTS_TABLE_NAME = "apartment";

export interface DbApartment {
  id: string;
  addressId: string;
  ownerId: string;
  noOfRooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  subdivision: SubdivisonTypeEnum;
  buildingType: BuildingTypeEnum;
  cooling?: boolean;
  heating?: HeatingTypeEnum;
  utilities?: string[];
  appliances?: string[];
  finishes?: string[];
  areaInfo?: string;
}

export enum SubdivisonTypeEnum {
  Decomandat = "Decomandat",
  Semidecomandat = "Semidecomandat",
  Nedecomandat = "Nedecomandat",
}

export enum BuildingTypeEnum {
  Apartament = "Bloc de apartamente",
  Casa = "Casa/Vila",
}

export enum HeatingTypeEnum {
  Centrala = "Centrala Proprie",
  Termoficare = "Termoficare",
}

interface DbApartmentRelations {
  address: DbAddress;
  owner: DbUserBasicInfo;
}
