import "dotenv/config";
import express from "express";
import { usersRouter } from "./routers";
import cors from "cors";
import knex from "@packages/db/knex";
import { APARTMENTS_TABLE_NAME } from "@packages/db/models/listings/apartment";
import { ADDRESS_TABLE_NAME } from "@packages/db/models/listings/address";
import { generateAddresses } from "@packages/db/seeds/addressGenerator";
import {
  storeAddress,
  storeApartment,
  storeListing,
} from "@packages/db/services/listings";
import { generateApartments } from "@packages/db/seeds/apartmentGenerator";
import { generateListings } from "@packages/db/seeds/listingGenerator";

const app = express();
const port = 3001;

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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/users", usersRouter);
