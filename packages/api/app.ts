import express from 'express';
import {usersRouter} from "./routers";

const app = express();
const port = 3001;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.use(express.json());
app.use('/users', usersRouter);