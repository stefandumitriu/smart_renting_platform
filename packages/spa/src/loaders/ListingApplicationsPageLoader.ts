import { GetListingApplicationsRequest } from "../requests/ListingsRequests";

// @ts-ignore
const listingApplicationsLoader = async ({ params }) => {
  const data = await GetListingApplicationsRequest(params.id as string);
  return data;
};

export default listingApplicationsLoader;
