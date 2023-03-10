import { axiosBaseInstance } from "./AxiosBaseInstance";
import { Listing } from "@packages/api/models/listings/listing";

const GET_LISTINGS_PATH = "/listings";

export const GetListingsRequest = async () => {
  const axiosResponse = await axiosBaseInstance.get(GET_LISTINGS_PATH);
  return axiosResponse.data as Listing[];
};
