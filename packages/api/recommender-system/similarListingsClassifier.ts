import { Listing } from "../models/listings/listing";

interface DeviationScore {
  listingId: string;
  score: number;
}

const ROOMS_SCALE_DOWN_FACTOR = 4;
const SURFACE_SCALE_DOWN_FACTOR = 200;
const PRICE_SCALE_DOWN_FACTOR = 500;

const similarListingsClassifier = (
  ref: Listing,
  listings: Listing[],
  n: number
): Listing[] => {
  const deviationScores: DeviationScore[] = listings.map((listing) => {
    if (listing.id === ref.id) {
      return {
        listingId: listing.id,
        score: Number.MAX_VALUE,
      };
    }
    const deviation =
      Math.abs(listing.price - ref.price) / PRICE_SCALE_DOWN_FACTOR +
      Math.abs(listing.apartment.noOfRooms - ref.apartment.noOfRooms) /
        ROOMS_SCALE_DOWN_FACTOR +
      Math.abs(listing.apartment.surface - ref.apartment.surface) /
        SURFACE_SCALE_DOWN_FACTOR;
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
