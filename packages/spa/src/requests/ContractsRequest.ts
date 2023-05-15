import { Contract, NewContact } from "@packages/api/models/contract";
import { axiosBaseInstance } from "./AxiosBaseInstance";

const CONTRACTS_PATH = "/contracts";

export const CreateContractRequest = async (contract: NewContact) => {
  const axiosResponse = await axiosBaseInstance.post(CONTRACTS_PATH, contract);
  return axiosResponse.data as Contract;
};

export const GetTenantContractRequest = async (tenantId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${CONTRACTS_PATH}/tenant/${tenantId}`
  );
  return axiosResponse.data as Contract;
};
