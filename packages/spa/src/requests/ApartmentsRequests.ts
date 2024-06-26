import { axiosBaseInstance } from "./AxiosBaseInstance";
import { Apartment } from "@packages/api/models/listings/apartment";

const GET_APARTMENTS_PATH = "/apartments";

export const GetApartmentByIdRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_APARTMENTS_PATH}/${id}`
  );
  return axiosResponse.data as Apartment;
};

export const GetApartmentsByOwnerIdRequest = async (ownerId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${GET_APARTMENTS_PATH}?ownerId=${ownerId}`
  );
  return axiosResponse.data as Apartment[];
};

export const PostApartmentRequest = async (newApartment: FormData) => {
  const axiosResponse = await axiosBaseInstance.post(
    `${GET_APARTMENTS_PATH}`,
    newApartment,
    { headers: { "Content-Type": "multipart/form-data" } }
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

export const DeleteApartmentRequest = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.delete(
    `${GET_APARTMENTS_PATH}/${id}`
  );
  return axiosResponse.status;
};
