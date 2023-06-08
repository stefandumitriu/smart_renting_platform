export interface DbMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  created_at: Date;
}

export const MESSAGES_TABLE_NAME = "message";
