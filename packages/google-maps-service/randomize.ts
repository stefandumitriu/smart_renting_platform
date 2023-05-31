import { GoogleGeocodingLatLong } from "./geocoding";

const MINIMUM_LAT = 44.39868001087234;
const MAXIMUM_LAT = 44.468175401855945;
const MINIMUM_LONG = 26.0313953612246;
const MAXIMUM_LONG = 26.160003310713883;

const generateNumber = (min: number, max: number) => {
  const range = max - min;
  return min + range * Math.random();
};

export const generateLatLong = (): GoogleGeocodingLatLong => {
  const lat = generateNumber(MINIMUM_LAT, MAXIMUM_LAT);
  const long = generateNumber(MINIMUM_LONG, MAXIMUM_LONG);
  return {
    lat,
    long,
  };
};
