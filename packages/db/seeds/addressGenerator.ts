import { DbAddress, StreetTypeEnum } from "../models/listings/address";
import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";

const StreetNamesArray = [
  "Mihai Eminescu",
  "1 Mai",
  "Zorilor",
  "Decebal",
  "Lalelelor",
  "Viilor",
  "Republicii",
  "Teilor",
];

export function generateAddresses(): DbAddress[] {
  const scrapedListingsFileContent = fs.readFileSync("../../scrapedData.json", {
    encoding: "utf-8",
  });

  const listings = JSON.parse(scrapedListingsFileContent);
  return listings.map((listing: any) => {
    console.log(listing);
    const streetTypeSeed =
      Math.floor(Math.random() * 100) % Object.values(StreetTypeEnum).length;
    const streetNameSeed =
      Math.floor(Math.random() * 100) % StreetNamesArray.length;
    const streetNumber = Math.floor(Math.random() * 100);
    const block = `${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}${Math.floor(Math.random() * 20)}`;
    const blockEntrance = (Math.floor(Math.random() * 10) % 4) + 1;
    const floor = parseInt((listing.floor as string).trim()[0]) || 1;
    const flatNumber = floor * (Math.floor(Math.random() * 6) + 1);
    return {
      id: uuidv4(),
      streetType: Object.values(StreetTypeEnum)[streetTypeSeed],
      streetName: StreetNamesArray[streetNameSeed],
      streetNumber,
      block,
      blockEntrance,
      floor,
      flatNumber,
    };
  });
}
