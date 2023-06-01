import { GoogleGeocodingLatLong } from "./geocoding";
import { generateLatLong } from "./randomize";
import * as fs from "fs";

export interface NeighbourhoodBounds {
  neighbourhood: string;
  northeast: GoogleGeocodingLatLong;
  southwest: GoogleGeocodingLatLong;
}

export const NEIGHBOURHOODS: string[] = [
  "Militari",
  "Crangasi",
  "Drumul Taberei",
  "Rahova",
  "Ferentari",
  "Berceni",
  "Tineretului",
  "Vitan",
  "Dristor",
  "Titan",
  "Tei",
  "Dorobanti",
  "Aviatiei",
  "Pipera",
  "Bucurestii Noi",
  "Cotroceni",
  "Sector 1",
  "Sector 2",
  "Sector 3",
  "Sector 4",
  "Sector 5",
  "Sector 6",
  "Bucuresti",
];

const GOOGLE_API_KEY = "AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk";

const getNeighbourhoodsBoundsRequest = (
  neighbourhood: string
): Promise<Response> => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${neighbourhood} Bucuresti&key=${GOOGLE_API_KEY}`
  );
};

const parseResponse = async (
  neighbourhood: string,
  res: Response
): Promise<NeighbourhoodBounds | undefined> => {
  const jsonResponse = await res.json();
  const results = jsonResponse.results;
  console.log(jsonResponse);
  if (!results || results.length === 0) {
    return undefined;
  }
  const geometry = results[0].geometry;
  if (!geometry) {
    return undefined;
  }
  const bounds = geometry.bounds;
  if (!bounds) {
    return undefined;
  }
  const northeast: GoogleGeocodingLatLong = {
    lat: bounds.northeast.lat,
    long: bounds.northeast.lng,
  };
  const southwest: GoogleGeocodingLatLong = {
    lat: bounds.southwest.lat,
    long: bounds.southwest.lng,
  };
  return {
    neighbourhood,
    northeast,
    southwest,
  };
};

const getNeighbourhoodBounds = async (
  neighbourhood: string
): Promise<NeighbourhoodBounds> => {
  const res = await getNeighbourhoodsBoundsRequest(neighbourhood);
  const bounds = await parseResponse(neighbourhood, res);
  if (!bounds) {
    const northeast = generateLatLong();
    const southwest = generateLatLong();
    return {
      neighbourhood,
      northeast,
      southwest,
    };
  }
  return bounds;
};

export const seedNeighbourhoodBounds = async (): Promise<void> => {
  const bounds = await Promise.all(NEIGHBOURHOODS.map(getNeighbourhoodBounds));
  fs.writeFileSync(
    "../spa/src/neighbourhoods.json",
    JSON.stringify(bounds),
    "utf-8"
  );
};
