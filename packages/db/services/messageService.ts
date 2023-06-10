import { DbMessage, MESSAGES_TABLE_NAME } from "../models";
import knex from "../knex";
import * as stream from "stream";
import _ from "lodash";

export async function getMessageById(
  id: string
): Promise<DbMessage | undefined> {
  return knex<DbMessage>(MESSAGES_TABLE_NAME).where({ id }).select().first();
}

export async function storeMessage(
  message: Omit<DbMessage, "created_at">
): Promise<DbMessage> {
  await knex<DbMessage>(MESSAGES_TABLE_NAME).insert(message);
  const storedMessage = await getMessageById(message.id);
  if (!storedMessage) {
    throw new Error("Error on message insert");
  }
  return storedMessage;
}

export async function getMessagesForUserChat(
  firstUserId: string,
  secondUserId: string
): Promise<DbMessage[]> {
  return knex<DbMessage>(MESSAGES_TABLE_NAME)
    .where({ senderId: firstUserId, receiverId: secondUserId })
    .orWhere({ senderId: secondUserId, receiverId: firstUserId })
    .select();
}

export async function getLinkedUsersIdForUser(
  userId: string
): Promise<string[]> {
  const query = await knex<DbMessage>(MESSAGES_TABLE_NAME)
    .where({ receiverId: userId })
    .orWhere({ senderId: userId })
    .orderBy("created_at", "desc")
    .select(["receiverId", "senderId"]);
  const ids = query.map((e) =>
    e.receiverId === userId ? e.senderId : e.receiverId
  );
  return _.uniq(ids);
}
