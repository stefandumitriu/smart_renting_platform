export const USER_REVIEWS_TABLE_NAME = "user_review";

export enum ReviewType {
  Tenant = "TENANT",
  Landlord = "LANDLORD",
}

export interface DbUserReview {
  id: string;
  reviewerId: string;
  userId: string;
  type: ReviewType;
  created_at: Date;
  fairnessRating: number;
  communicationRating: number;
  availabilityRating: number;
  comment?: string;
}
