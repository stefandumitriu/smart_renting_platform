import {
  BuildingTypeEnum,
  DbApartment,
  HeatingTypeEnum,
  SubdivisonTypeEnum,
} from "../models/listings/apartment";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import { DbAddress } from "../models/listings/address";

const OWNER_ID = "83813324-038d-4367-bc27-b79c4ea24020";
const areaInfo =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non velit vitae augue tristique euismod. Aenean a nulla ipsum. Etiam pharetra id metus luctus dapibus. Sed lobortis varius urna a.";

const utilitiesArray = [
  "Curent, Apa, Canalizare, Gaz",
  "CATV",
  "Incalizre pardoseala",
  "Internet Wireless",
];

const appliancesArray = [
  "Masina de spalat rufe",
  "Masina de spalat vase",
  "TV",
  "Frigider",
  "Cuptor microunde",
  "Hota",
  "Termostat",
];

const finishesArray = [
  "Vopsea lavabila",
  "Usa metalica exterior",
  "Usi lemn interior",
  "Termopane",
  "Gresie",
  "Parchet",
  "Izolatie termica",
  "Instalatie sanitara premium",
];

export function generateApartments(addresses: DbAddress[]): DbApartment[] {
  const scrapedListingsFileContent = fs.readFileSync("../../scrapedData.json", {
    encoding: "utf-8",
  });

  const listings = JSON.parse(scrapedListingsFileContent);
  return listings.map((listing: any, index: number) => {
    const noOfRoomsString = (listing.noOfRooms as string).trim()[0];
    let noOfRooms;
    if (noOfRoomsString === "o") {
      noOfRooms = 1;
    } else {
      noOfRooms = parseInt(noOfRoomsString);
    }
    const surface = Math.floor(
      Number.parseFloat((listing.surface as string).trim().split(" ")[0])
    );
    const noOfBathrooms = Math.round(noOfRooms / 2);
    const noOfBalconies = Math.floor(noOfRooms / 2);
    const subdivisionType = (listing.subdivision as string)?.trim() || "Dec.";
    let subdivision: SubdivisonTypeEnum;
    switch (subdivisionType) {
      case "Dec.":
        subdivision = SubdivisonTypeEnum.Decomandat;
        break;
      case "Semidec.":
        subdivision = SubdivisonTypeEnum.Semidecomandat;
        break;
      default:
        subdivision = SubdivisonTypeEnum.Nedecomandat;
        break;
    }
    const hasCooling = Math.floor(Math.random() * 10) % 2 === 1;
    const heatingTypeSeed = Math.floor(Math.random() * 10) % 2;
    const utilities: Record<string, boolean> = {};
    utilitiesArray.forEach((u) => {
      const seed = Math.floor(Math.random() * 10) % 2;
      utilities[u] = seed === 1;
    });
    const appliances: Record<string, boolean> = {};
    appliancesArray.forEach((a) => {
      const seed = Math.floor(Math.random() * 10) % 2;
      appliances[a] = seed === 1;
    });
    const finishes: Record<string, boolean> = {};
    finishesArray.forEach((f) => {
      const seed = Math.floor(Math.random() * 10) % 2;
      finishes[f] = seed === 1;
    });
    return {
      id: uuidv4(),
      addressId: addresses[index].id,
      ownerId: OWNER_ID,
      surface,
      noOfRooms,
      noOfBathrooms,
      noOfBalconies,
      subdivision,
      buildingType: BuildingTypeEnum.Apartament,
      cooling: hasCooling,
      heating: Object.values(HeatingTypeEnum)[heatingTypeSeed],
      utilities,
      appliances,
      finishes,
      areaInfo,
    } as DbApartment;
  });
}
