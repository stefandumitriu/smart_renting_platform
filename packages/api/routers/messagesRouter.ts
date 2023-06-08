import express from "express";
import {
  getConversationMessages,
  getLinkedUsers,
  postMessage,
} from "../controllers/messagesController";

const messagesRouter = express.Router();

messagesRouter.get("/:id/linked-users", getLinkedUsers);
messagesRouter.get("/:id/conversation/:partnerId", getConversationMessages);
messagesRouter.post("/:id/conversation/:partnerId", postMessage);

export default messagesRouter;
