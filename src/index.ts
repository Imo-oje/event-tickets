import { config } from "dotenv";
config();
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";

import authRouter from "./router/auth-router";
import connectDB from "./db/db";
import { PORT } from "./constants";
import path from "path";
import indexRouter from "./router/index-router";
import cookieParser from "cookie-parser";
import eventRouter from "./router/event-router";
import authenticate from "./middleware/authenticate";
import profileRouter from "./router/profile-router";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/event", authenticate, eventRouter);
app.use("/profile", authenticate, profileRouter);

app.listen(PORT, "localhost", async () => {
  await connectDB();
  console.log(`server listening on port ${PORT}`);
});

// Error handler
app.use(
  (
    error: ErrorRequestHandler,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    console.log("[Error]: ", error);
    response.status(500).send(error);
  }
);
