import express from "express";
import {
  getUserEmailById,
  loginUser,
  patchUserProfile,
  signUpUser,
} from "../controllers";

const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.get("/login", loginUser);
usersRouter.get("/:id", getUserEmailById);
usersRouter.patch("/profile/:id", patchUserProfile);

export default usersRouter;
