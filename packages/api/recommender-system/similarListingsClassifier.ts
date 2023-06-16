import { Listing } from "../models/listings/listing";

interface DeviationScore {
  listingId: string;
  score: number;
}

type Point = {
  x: number;
  y: number;
  z: number;
};
const ROOMS_SCALE_DOWN_FACTOR = 4;
const SURFACE_SCALE_DOWN_FACTOR = 400;
const PRICE_SCALE_DOWN_FACTOR = 1000;

const similarListingsClassifier = (
  ref: Listing,
  listings: Listing[],
  n: number
): Listing[] => {
  const refPoint: Point = {
    x: ref.apartment.noOfRooms / ROOMS_SCALE_DOWN_FACTOR,
    y: ref.price / PRICE_SCALE_DOWN_FACTOR,
    z: ref.apartment.surface / SURFACE_SCALE_DOWN_FACTOR,
  };
  const deviationScores: DeviationScore[] = listings.map((listing) => {
    if (listing.id === ref.id) {
      return {
        listingId: listing.id,
        score: Number.MAX_VALUE,
      };
    }
    const listingPoint: Point = {
      x: listing.apartment.noOfRooms / ROOMS_SCALE_DOWN_FACTOR,
      y: listing.price / PRICE_SCALE_DOWN_FACTOR,
      z: listing.apartment.surface / SURFACE_SCALE_DOWN_FACTOR,
    };
    const deviation = Math.sqrt(
      Math.pow(listingPoint.x - refPoint.x, 2) +
        Math.pow(listingPoint.y - refPoint.y, 2) +
        Math.pow(listingPoint.z - refPoint.z, 2)
    );
    return {
      listingId: listing.id,
      score: deviation,
    };
  });
  const sortedDeviationArray: DeviationScore[] = deviationScores.sort(
    (a, b) => a.score - b.score
  );
  return sortedDeviationArray
    .slice(0, Math.min(n, sortedDeviationArray.length))
    .map((e) => listings.find((l) => l.id === e.listingId) as Listing);
};

export default similarListingsClassifier;
