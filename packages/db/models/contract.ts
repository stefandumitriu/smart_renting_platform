export const CONTRACTS_TABLE_NAME = "contract";

export interface DbContract {
  id: string;
  apartmentId: string;
  tenantId: string;
  landlordId: string;
  startDate: Date;
  endDate?: Date;
  rentPayday: string;
  paymentInfo?: string;
  depositValue: number;
  additionalClauses?: string;
  status: ContractStatus;
  price: number;
}

export enum ContractStatus {
  Draft = "Draft",
  Ongoing = "In desfasurare",
  Closed = "Incheiat",
}
