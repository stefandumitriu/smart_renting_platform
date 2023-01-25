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
}

export enum StreetTypeEnum {
  Alee = "Aleea",
  Strada = "Strada",
  Sosea = "Soseaua",
  Bulevard = "Bulevardul",
  Splai = "Splaiul",
}
