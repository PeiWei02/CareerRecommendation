import express from "express";
import {
  checkSurveyCompleted,
  createCompleteResult,
  createHollan6Result,
  createMBTIResult,
  createTheVarkResult,
} from "../controllers/survey.js";
import { checkToken } from "../middlewares/middlewares.js";

const surveryRouter = express.Router();

surveryRouter.post("/:id/holland6Result", checkToken, createHollan6Result);

surveryRouter.post("/:id/theVarkResult", checkToken, createTheVarkResult);

surveryRouter.post("/:id/mbtiResult", checkToken, createMBTIResult);

surveryRouter.post(
  "/:id/checkSurveyCompleted",
  checkToken,
  checkSurveyCompleted
);

surveryRouter.post("/:id/completeResult", checkToken, createCompleteResult);

export default surveryRouter;
