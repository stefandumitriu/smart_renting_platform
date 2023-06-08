import { axiosBaseInstance } from "./AxiosBaseInstance";
import { UserProfile } from "@packages/api/models/users/userProfile";
import { DbMessage } from "@packages/db";

const MESSAGES_PATH = "/messages";

export const GetLinkedUsersRequests = async (id: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${MESSAGES_PATH}/${id}/linked-users`
  );
  return axiosResponse.data as UserProfile[];
};

export const GetConversationRequest = async (id: string, partnerId: string) => {
  const axiosResponse = await axiosBaseInstance.get(
    `${MESSAGES_PATH}/${id}/conversation/${partnerId}`
  );
  return axiosResponse.data as DbMessage[];
};
