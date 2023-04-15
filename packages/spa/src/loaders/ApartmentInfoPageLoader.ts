import { GetApartmentByIdRequest } from "../requests/ApartmentsRequests";

// @ts-ignore
const apartmentInfoPageLoader = async ({ params }) => {
  const apartment = await GetApartmentByIdRequest(params.id as string);
  return apartment;
};

export default apartmentInfoPageLoader;
