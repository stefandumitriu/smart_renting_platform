import { Request, Response } from "express";
import { createNewUser, updateUser } from "../services/users/userService";
import { getUserProfileByCredentialsId } from "@packages/db/services";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    const userProfile = await createNewUser(req.body);
    res.status(200).send(userProfile);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;
    const userInfo = await getUserProfileByCredentialsId(userId);
    if (!userInfo) {
      res.sendStatus(400);
      return;
    }
    res.status(200).send(userInfo);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

export const patchUserProfile = async (req: Request, res: Response) => {
  try {
    const updatedUserProfile = await updateUser(req.params.id, req.body);
    res.send(updatedUserProfile);
  } catch (e) {
    console.error(e);
  }
};
