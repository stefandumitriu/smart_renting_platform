import { Request, Response } from "express";
import { createNewUser, getUserToken } from "../services/users/userService";
import { getUserIdFromAccessToken } from "../authentication/tokenAuthentication";
import {
  getUserCredentialsById,
  getUserProfileByCredentialsId,
} from "@packages/db/services";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const newUserId = await createNewUser(req.body);
    res.send(newUserId);
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userAccessToken = await getUserToken({
      email: req.query["email"] as string,
      password: req.query["password"] as string,
    });
    if (!userAccessToken) {
      res.sendStatus(400);
      return;
    }
    const userId = getUserIdFromAccessToken(userAccessToken);
    const userInfo = await getUserProfileByCredentialsId(userId);
    if (!userInfo) {
      res.sendStatus(400);
      return;
    }
    console.log(userInfo);
    res.send(userInfo);
  } catch (err) {
    console.log(err);
  }
};

export const getUserEmailById = async (req: Request, res: Response) => {
  try {
    const userCredentials = await getUserCredentialsById(
      req.params.id as string
    );
    if (!userCredentials) {
      res.sendStatus(404);
      return;
    }
    res.send(userCredentials.username);
  } catch (e) {
    console.log(e);
  }
};
