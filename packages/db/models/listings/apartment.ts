export const APARTMENTS_TABLE_NAME = "apartment";

export interface DbApartment {
  id: string;
  addressId: string;
  ownerId: string;
  surface: number;
  noOfRooms: number;
  noOfBathrooms: number;
  noOfBalconies: number;
  subdivision: SubdivisonTypeEnum;
  buildingType: BuildingTypeEnum;
  cooling?: boolean;
  heating?: HeatingTypeEnum;
  utilities?: Record<string, boolean>;
  appliances?: Record<string, boolean>;
  finishes?: Record<string, boolean>;
  areaInfo?: string;
  addressProof?: string;
  status: ApartmentStatus;
}

export enum ApartmentStatus {
  UnderReview = "Under Review",
  Available = "Available",
  Listed = "Listed",
  Rented = "Rented",
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
