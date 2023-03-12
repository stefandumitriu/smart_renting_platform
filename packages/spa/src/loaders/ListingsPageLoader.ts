import { GetListingsRequest } from "../requests/ListingsRequests";

const listingsPageLoader = async () => {
  const data = await GetListingsRequest();
  return data;
};

export default listingsPageLoader;
