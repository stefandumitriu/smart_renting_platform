import {
  GetListingByIdRequest,
  GetUserFavouriteListingsRequest,
} from "../requests/ListingsRequests";

export const userListingsLoader = async (userId: string) => {
  const favouriteListings = await GetUserFavouriteListingsRequest(userId);
  return Promise.all(
    favouriteListings.map(async (favouriteListing) => {
      return GetListingByIdRequest(favouriteListing.listingId);
    })
  );
};
