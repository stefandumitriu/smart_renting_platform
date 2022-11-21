import {Request, Response} from "express";
import {createNewUser, getUser} from "../services/users/userBasicInfoService";

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
        const userInfo = await getUser({
            email: req.query['email'] as string,
            password: req.query['password'] as string
        });
        res.send(userInfo);
    } catch (err) {
        console.log(err);
    }
}