import { Request, Response } from "express";
import { DbUserProfile } from "@packages/db/models";
import {
  getLinkedUsersIdForUser,
  getMessagesForUserChat,
  getUserProfileById,
  storeMessage,
} from "@packages/db/services";
import { convertDbUserProfileToAPIUserProfile } from "../convertors/users/userProfile";
import { v4 as uuidv4 } from "uuid";

const isUserProfile = (e: DbUserProfile | undefined): e is DbUserProfile => {
  return e !== undefined;
};

export const getLinkedUsers = async (req: Request, res: Response) => {
  try {
    const linkedUserIds = await getLinkedUsersIdForUser(
      req.params.id as string
    );
    const dbLinkedUsers = (
      await Promise.all(linkedUserIds.map(getUserProfileById))
    ).filter(isUserProfile);
    const linkedUsers = await Promise.all(
      dbLinkedUsers.map(convertDbUserProfileToAPIUserProfile)
    );
    res.send(linkedUsers);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const getConversationMessages = async (req: Request, res: Response) => {
  try {
    const messages = await getMessagesForUserChat(
      req.params.id as string,
      req.params.partnerId as string
    );
    res.send(messages);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const postMessage = async (req: Request, res: Response) => {
  try {
    const storedMessage = await storeMessage({
      id: uuidv4(),
      senderId: req.params.id as string,
      receiverId: req.params.partnerId as string,
      text: req.body.text,
    });
    res.send(storedMessage);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
