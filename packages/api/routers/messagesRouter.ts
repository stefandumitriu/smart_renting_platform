import express from "express";
import {
  getConversationMessages,
  getLinkedUsers,
} from "../controllers/messagesController";

const messagesRouter = express.Router();

messagesRouter.get("/:id/linked-users", getLinkedUsers);
messagesRouter.get("/:id/conversation/:partnerId", getConversationMessages);

export default messagesRouter;
