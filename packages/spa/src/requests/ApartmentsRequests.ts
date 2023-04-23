import { axiosBaseInstance } from "./AxiosBaseInstance";
import {
  Apartment,
  NewApartment,
} from "@packages/api/models/listings/apartment";

const GET_APARTMENTS_PATH = "/apartments";

export const GetApartmentByIdRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_APARTMENTS_PATH}/${id}`
  );
  return axiosResponse.data as Apartment;
};

export const PostApartmentRequest = async (newApartment: NewApartment) => {
  const axiosResponse = await axiosBaseInstance.post(
    `${GET_APARTMENTS_PATH}`,
    newApartment
  );
  return axiosResponse.data as Apartment;
};

export const PatchApartmentRequest = async (
  id: string,
  apartment: Apartment
) => {
  const axiosResponse = await axiosBaseInstance.patch(
    `${GET_APARTMENTS_PATH}/${id}`,
    apartment
  );
  return axiosResponse.data as Apartment;
};
