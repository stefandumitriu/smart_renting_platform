import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { DbApartment } from "../models/listings/apartment";
import { DbListing } from "../models/listings/listing";

const rentalPeriods = ["1 an", "> 1 an", "6 luni", "3 luni"];
const availabilityArray = [
  "la inceputul lunii",
  "la finalul lunii",
  "in 2 luni",
  "imediat",
];

export function generateListings(apartments: DbApartment[]): DbListing[] {
  const scrapedListingsFileContent = fs.readFileSync("../../scrapedData.json", {
    encoding: "utf-8",
  });

  const listings = JSON.parse(scrapedListingsFileContent);
  return listings.map((listing: any, index: number) => {
    const rentalPeriodSeed = Math.floor(Math.random() * 4);
    const availabilitySeed = Math.floor(Math.random() * 4);
    const priceString =
      (listing.price as string)?.trim().replace(".", "") || "0";
    return {
      id: uuidv4(),
      apartmentId: apartments[index].id,
      title: (listing.title as string).trim(),
      price: parseInt(priceString),
      rentalPeriod: rentalPeriods[rentalPeriodSeed],
      availability: availabilityArray[availabilitySeed],
    } as DbListing;
  });
}
