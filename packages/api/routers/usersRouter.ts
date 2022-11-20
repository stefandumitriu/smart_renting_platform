import express from 'express';
import {signUpUser} from "../controllers";

const usersRouter = express.Router();

usersRouter.post('/signup', signUpUser);

export default usersRouter;