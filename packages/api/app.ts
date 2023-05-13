import "dotenv/config";
import express from "express";
import { apartmentsRouter, listingsRouter, usersRouter } from "./routers";
import cors from "cors";
import contractsRouter from "./routers/contractsRouter";

const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use("/users", usersRouter);
app.use("/listings", listingsRouter);
app.use("/apartments", apartmentsRouter);
app.use("/contracts", contractsRouter);
