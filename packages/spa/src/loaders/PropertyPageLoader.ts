import { GetListingByIdRequest } from "../requests/ListingsRequests";

// @ts-ignore
const propertyPageLoader = async ({ params }) => {
  const data = await GetListingByIdRequest(params.id as string);
  return data;
};

export default propertyPageLoader;
