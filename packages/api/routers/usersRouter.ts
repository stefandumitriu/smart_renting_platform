import express from 'express';
import {loginUser, signUpUser} from "../controllers";

const usersRouter = express.Router();

usersRouter.post('/signup', signUpUser);
usersRouter.get('/login', loginUser);

export default usersRouter;