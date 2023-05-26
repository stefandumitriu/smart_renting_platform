export const ADDRESS_TABLE_NAME = "address";

export interface DbAddress {
  id: string;
  streetType: StreetTypeEnum;
  streetName: string;
  streetNumber: number;
  block?: string;
  blockEntrance?: number;
  floor?: number;
  flatNumber?: number;
  lat?: number;
  long?: number;
}

export enum StreetTypeEnum {
  Alee = "Aleea",
  Calea = "Calea",
  Strada = "Strada",
  Sosea = "Şoseaua",
  Bulevard = "Bulevardul",
  Splai = "Splaiul",
}
