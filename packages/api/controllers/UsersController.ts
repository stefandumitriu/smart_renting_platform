import {Request, Response} from "express";
import {createNewUser} from "../services/users/userBasicInfoService";

export const signUpUser = async (req: Request, res: Response) => {
    try {
        const newUserId = await createNewUser(req.body);
        res.send(newUserId);
    } catch (err) {
        console.log(err);
    }
};