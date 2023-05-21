import {
  GetApartmentReviewsRequest,
  GetLandlordUserReviewsRequest,
  GetTenantUserReviewsRequest,
} from "../requests/ReviewsRequests";

// @ts-ignore
export const landlordUserReviewsLoader = async ({ params }) => {
  const data = await GetLandlordUserReviewsRequest(params.id as string);
  return data;
};

// @ts-ignore
export const tenantUserReviewsLoader = async ({ params }) => {
  const data = await GetTenantUserReviewsRequest(params.id as string);
  return data;
};

// @ts-ignore
export const apartmentReviewsLoader = async ({ params }) => {
  const data = await GetApartmentReviewsRequest(params.id as string);
  return data;
};
