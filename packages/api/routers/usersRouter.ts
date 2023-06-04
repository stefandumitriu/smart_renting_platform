import express from "express";
import { loginUser, patchUserProfile, signUpUser } from "../controllers";

const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.get("/login/:userId", loginUser);
usersRouter.patch("/profile/:id", patchUserProfile);

export default usersRouter;
