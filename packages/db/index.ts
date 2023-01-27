import { generateAddresses } from "./seeds/addressGenerator";
import { storeAddress, storeApartment, storeListing } from "./services";
import { generateApartments } from "./seeds/apartmentGenerator";
import knex from "./knex";
import { ADDRESS_TABLE_NAME } from "./models/listings/address";
import { APARTMENTS_TABLE_NAME } from "./models/listings/apartment";
import { generateListings } from "./seeds/listingGenerator";

export * from "./models";
export * from "./services";

const runSeeds = async () => {
  await knex(APARTMENTS_TABLE_NAME).del();
  await knex(ADDRESS_TABLE_NAME).del();
  const addressSeed = generateAddresses();
  await Promise.all(addressSeed.map((address) => storeAddress(address)));
  const apartmentSeed = generateApartments(addressSeed);
  await Promise.all(
    apartmentSeed.map((apartment) => storeApartment(apartment))
  );
  const listingSeed = generateListings(apartmentSeed);
  await Promise.all(listingSeed.map((listing) => storeListing(listing)));
};

(async () => runSeeds())().then(() => {
  process.exit();
});
