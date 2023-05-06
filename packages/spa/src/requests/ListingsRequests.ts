import { axiosBaseInstance } from "./AxiosBaseInstance";
import { Listing } from "@packages/api/models/listings/listing";
import { FavouriteListing } from "@packages/api/models/listings/favouriteListing";
import { Application } from "@packages/api/models/listings/application";

const GET_LISTINGS_PATH = "/listings";
const FAVOURITE_LISTINGS_PATH = "/listings/favourite-listing";
const APPLICATIONS_PATH = "/listings/applications";

export const CreateListingRequest = async (listing: FormData) => {
  const axiosResponse = await axiosBaseInstance.post(
    GET_LISTINGS_PATH,
    listing,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return axiosResponse.data as Listing;
};

export const DeleteListingRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.delete(
    `${GET_LISTINGS_PATH}/${id}`
  );
  return axiosResponse.status;
};

export const GetListingsRequest = async () => {
  const axiosResponse = await axiosBaseInstance.get(GET_LISTINGS_PATH);
  return axiosResponse.data as Listing[];
};

export const GetUserListingsRequest = async (ownerId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_LISTINGS_PATH}/user/${ownerId}`
  );
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

export const CreateApplicationRequest = async (
  listingId: string,
  tenantId: string,
  landlordId: string,
  additionalInfo?: string
) => {
  const axiosResponse = await axiosBaseInstance.post(APPLICATIONS_PATH, {
    listingId,
    tenantId,
    landlordId,
    additionalInfo,
  });
  return axiosResponse.data;
};

export const GetTenantApplicationsRequest = async (tenantId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${APPLICATIONS_PATH}/tenant/${tenantId}`
  );

  return axiosResponse.data as Application[];
};

export const GetListingApplicationsRequest = async (listingId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_LISTINGS_PATH}/${listingId}/applications`
  );

  return axiosResponse.data as Application[];
};

export const DeleteApplicationRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.delete(
    `${APPLICATIONS_PATH}/${id}`
  );

  return axiosResponse.status;
};
