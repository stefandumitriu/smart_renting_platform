import express from "express";
import { getUserEmailById, loginUser, signUpUser } from "../controllers";

const usersRouter = express.Router();

usersRouter.post("/signup", signUpUser);
usersRouter.get("/login", loginUser);
usersRouter.get("/:id", getUserEmailById);

export default usersRouter;
