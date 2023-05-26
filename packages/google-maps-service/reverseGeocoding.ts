import { StreetTypeEnum } from "@packages/db/models";

export interface GoogleGeocodingStreetAddress {
  streetType: StreetTypeEnum;
  streetName: string;
  streetNumber: number;
}

const GOOGLE_API_KEY = "AIzaSyDK8p89yd-Pr9WsdklJySETO5QKFCE8FVk";

const reverseGeocodingRequest = async (
  lat: number,
  long: number
): Promise<Response> => {
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}&result_type=street_address`
  );
};

const parseResponse = async (
  res: Response
): Promise<GoogleGeocodingStreetAddress | undefined> => {
  const jsonResponse = await res.json();
  const results = jsonResponse.results;
  if (!results || results.length === 0) {
    return undefined;
  }
  const formatted_address = results[0].formatted_address as string;
  if (!formatted_address) {
    return undefined;
  }
  const tokenizedAddress = formatted_address.split(",")[0].split(" ");
  if (!tokenizedAddress || tokenizedAddress.length < 3) {
    return undefined;
  }
  const streetType = tokenizedAddress[0] as StreetTypeEnum;
  const streetNumber = parseInt(
    tokenizedAddress[tokenizedAddress.length - 1].replace(/\D/g, "")
  );
  let streetName = "";
  for (let i = 1; i < tokenizedAddress.length - 1; i++) {
    streetName += tokenizedAddress[i] + " ";
  }
  if (
    !streetName ||
    !Object.values(StreetTypeEnum).includes(streetType) ||
    !streetNumber
  ) {
    return undefined;
  }
  return {
    streetType,
    streetName,
    streetNumber,
  };
};

export const reverseGeocode = async (
  lat: number,
  long: number
): Promise<GoogleGeocodingStreetAddress | undefined> => {
  const response = await reverseGeocodingRequest(lat, long);
  return parseResponse(response);
};
