export const APPLICATIONS_TABLE_NAME = "application";

export enum ApplicationStatus {
  Waiting = "Waiting",
  Approved = "Approved",
  Rejected = "Rejected",
}

export interface DbApplication {
  id: string;
  landlordId: string;
  tenantId: string;
  listingId: string;
  additionalInfo?: string;
  status: ApplicationStatus;
}
