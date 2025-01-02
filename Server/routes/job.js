import express from "express";
import multer from "multer";
import {
  createJobs,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controllers/job.js";
import { checkToken } from "../middlewares/middlewares.js";

const upload = multer({ storage: multer.memoryStorage() });
const jobRouter = express.Router();

jobRouter.get("/", checkToken, getJobs);
jobRouter.get("/:id/getJob", checkToken, getJob);
jobRouter.post("/addJob", upload.single("image"), checkToken, createJobs);
jobRouter.put("/:id/updateJob", upload.single("image"), checkToken, updateJob);
jobRouter.delete("/:id/deleteJob", checkToken, deleteJob);

export default jobRouter;
