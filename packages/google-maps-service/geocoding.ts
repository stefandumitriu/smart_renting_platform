import { StreetTypeEnum } from "@packages/db";

export interface GoogleGeocodingLatLong {
  lat: number;
  long: number;
}

const GOOGLE_API_KEY = "AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk";

const geocodeRequest = (
  streetType: StreetTypeEnum,
  streetName: string,
  streetNumber: number
) => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber.toString()} ${streetType} ${streetName} Bucuresti&key=${GOOGLE_API_KEY}`
  );
};

const parseResponse = async (
  res: Response
): Promise<GoogleGeocodingLatLong | undefined> => {
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
  const location = geometry.location;
  if (!location) {
    return undefined;
  }
  const lat: number = location.lat;
  const long: number = location.lng;
  if (!lat || !long) {
    return undefined;
  }
  return {
    lat,
    long,
  };
};

export const geocode = async (
  streetType: StreetTypeEnum,
  streetName: string,
  streetNumber: number
): Promise<GoogleGeocodingLatLong | undefined> => {
  const response = await geocodeRequest(streetType, streetName, streetNumber);
  return parseResponse(response);
};
