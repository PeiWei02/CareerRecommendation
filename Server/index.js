import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { DBConnection } from "./config/db.js";
import jobRouter from "./routes/job.js";
import profileRouter from "./routes/profile.js";
import surveryRouter from "./routes/survey.js";
import authRouter from "./routes/user.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || origin === "http://localhost:5173") {
        return callback(null, true);
      }
      return callback(new Error("Access Denied"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/job", jobRouter);
app.use("/survey", surveryRouter);

DBConnection();
app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});
