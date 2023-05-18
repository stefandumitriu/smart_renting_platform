export const APARTMENT_REVIEWS_TABLE_NAME = "apartment_review";

export interface DbApartmentReview {
  id: string;
  created_at: Date;
  reviewerId: string;
  apartmentId: string;
  comfortRating: number;
  locationRating: number;
  qualityRating: number;
  comment?: string;
}
