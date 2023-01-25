import { generateAddresses } from "./seeds/addressGenerator";
import { storeAddress } from "./services";

export * from "./models";
export * from "./services";

const runSeeds = async () => {
  const addressSeed = generateAddresses();
  return Promise.all(addressSeed.map((address) => storeAddress(address)));
};

(async () => runSeeds())().then(() => {
  console.log("Adresses seeded");
  process.exit();
});
