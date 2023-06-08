import express from "express";
import {
  getUserProfile,
  loginUser,
  patchUserProfile,
  signUpUser,
} from "../controllers";

const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.get("/login/:userId", loginUser);
usersRouter.get("/profile/:id", getUserProfile);
usersRouter.patch("/profile/:id", patchUserProfile);

export default usersRouter;
