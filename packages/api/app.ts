import express from 'express';
import {usersRouter} from "./routers";
import cors from 'cors';

const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json());
app.use('/users', usersRouter);