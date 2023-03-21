import { axiosBaseInstance } from "./AxiosBaseInstance";
import { Listing } from "@packages/api/models/listings/listing";
import { FavouriteListing } from "@packages/api/models/listings/favouriteListing";

const GET_LISTINGS_PATH = "/listings";
const FAVOURITE_LISTINGS_PATH = "/listings/favourite-listing";

export const GetListingsRequest = async () => {
  const axiosResponse = await axiosBaseInstance.get(GET_LISTINGS_PATH);
  return axiosResponse.data as Listing[];
};

export const GetListingByIdRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_LISTINGS_PATH}/${id}`
  );
  return axiosResponse.data as Listing;
};

export const GetUserFavouriteListingsRequest = async (userId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${FAVOURITE_LISTINGS_PATH}?userId=${userId}`
  );
  return axiosResponse.data as FavouriteListing[];
};

export const CreateFavouriteListingRequest = async (
  listingId: string,
  userId: string
) => {
  const axiosResponse = await axiosBaseInstance.post(FAVOURITE_LISTINGS_PATH, {
    listingId,
    userId,
  });
  return axiosResponse.data as FavouriteListing;
};

export const DeleteFavouriteListingRequest = async (listingId: string) => {
  const axiosResponse = await axiosBaseInstance.delete(
    `${FAVOURITE_LISTINGS_PATH}/${listingId}`
  );
  return axiosResponse.status;
};
