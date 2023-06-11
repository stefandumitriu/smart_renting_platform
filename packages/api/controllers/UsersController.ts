import { Request, Response } from "express";
import { createNewUser, updateUser } from "../services/users/userService";
import {
  getUserProfileByCredentialsId,
  getUserProfileById,
} from "@packages/db/services";
import { convertDbUserProfileToAPIUserProfile } from "../convertors/users/userProfile";

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

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const dbUserProfile = await getUserProfileById(req.params.id as string);
    if (!dbUserProfile) {
      throw new Error("User profile not found");
    }
    const userProfile = await convertDbUserProfileToAPIUserProfile(
      dbUserProfile
    );
    res.send(userProfile);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

export const patchUserProfile = async (req: Request, res: Response) => {
  try {
    const updatedUserProfile = await updateUser(req.params.id, req.body);
    res.send(updatedUserProfile);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
