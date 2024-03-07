import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CLIENT_URL } from "./config.js";
import userRouter from "../routes/user.routes.js";
import morgan from "morgan";
import taskRouter from "../routes/task.routes.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", userRouter);

app.use("/api", taskRouter);

app.use((req, res) => {
  res.json({ mensaje: "Not Found" });
});

export default app;
