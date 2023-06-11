import "dotenv/config";
import express from "express";
import { apartmentsRouter, listingsRouter, usersRouter } from "./routers";
import cors from "cors";
import contractsRouter from "./routers/contractsRouter";
import reviewsRouter from "./routers/reviewsRouter";
import messagesRouter from "./routers/messagesRouter";

const app = express();
const port = 3001;

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

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
app.use("/reviews", reviewsRouter);
app.use("/messages", messagesRouter);

export default app;
