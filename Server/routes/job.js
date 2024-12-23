import express from "express";
import {
  createJobs,
  deleteJob,
  getJob,
  getJobs,
  updateJob,
} from "../controllers/job.js";
import { checkToken } from "../middlewares/middlewares.js";

const jobRouter = express.Router();

jobRouter.get("/", checkToken, getJobs);
jobRouter.get("/:id/getJob", checkToken, getJob);
jobRouter.post("/addJob", checkToken, createJobs);
jobRouter.put("/:id/updateJob", checkToken, updateJob);
jobRouter.delete("/:id/deleteJob", checkToken, deleteJob);

export default jobRouter;
