import {
  ApartmentReview,
  NewApartmentReview,
  NewUserReview,
  UserReview,
} from "@packages/api/models";
import { axiosBaseInstance } from "./AxiosBaseInstance";

const USER_REVIEWS_PATH = "/reviews/user-review";
const APARTMENT_REVIEWS_PATH = "/reviews/apartment-review";

export async function CreateUserReviewRequest(
  userReview: NewUserReview
): Promise<UserReview> {
  const response = await axiosBaseInstance.post(USER_REVIEWS_PATH, userReview);
  return response.data as UserReview;
}

export async function CreateApartmentReviewRequest(
  apartmentReview: NewApartmentReview
): Promise<ApartmentReview> {
  const response = await axiosBaseInstance.post(
    APARTMENT_REVIEWS_PATH,
    apartmentReview
  );
  return response.data as ApartmentReview;
}

export async function GetLandlordUserReviewsRequest(
  id: string
): Promise<UserReview[]> {
  const response = await axiosBaseInstance.get(
    `${USER_REVIEWS_PATH}/${id}/landlord`
  );
  return response.data as UserReview[];
}

export async function GetTenantUserReviewsRequest(
  id: string
): Promise<UserReview[]> {
  const response = await axiosBaseInstance.get(
    `${USER_REVIEWS_PATH}/${id}/tenant`
  );
  return response.data as UserReview[];
}

export async function GetApartmentReviewsRequest(
  id: string
): Promise<ApartmentReview[]> {
  const response = await axiosBaseInstance.get(
    `${APARTMENT_REVIEWS_PATH}/${id}`
  );
  return response.data as ApartmentReview[];
}

export async function GetAllLandlordReviewsRequest(): Promise<UserReview[]> {
  const response = await axiosBaseInstance.get(USER_REVIEWS_PATH);
  return response.data as UserReview[];
}

export async function GetAllApartmentReviewsRequest(): Promise<
  ApartmentReview[]
> {
  const response = await axiosBaseInstance.get(APARTMENT_REVIEWS_PATH);
  return response.data as ApartmentReview[];
}

export async function GetLandlordReviewByReviewerId(
  id: string,
  reviewerId: string
): Promise<UserReview | undefined> {
  const response = await axiosBaseInstance.get(
    `${USER_REVIEWS_PATH}/${id}/reviewer/${reviewerId}?type=LANDLORD`
  );
  if (response.status !== 200) {
    return undefined;
  }
  return response.data as UserReview;
}

export async function GetTenantReviewByReviewerId(
  id: string,
  reviewerId: string
): Promise<UserReview | undefined> {
  const response = await axiosBaseInstance.get(
    `${USER_REVIEWS_PATH}/${id}/reviewer/${reviewerId}?type=TENANT`
  );
  if (response.status !== 200) {
    return undefined;
  }
  return response.data as UserReview;
}
