import express from "express";
import {
  checkSurveyCompleted,
  createCompleteResult,
  createHollan6Result,
  createMBTIResult,
  createTheVarkResult,
  getHolland6Results,
  getMBTIResults,
  getTheVarkResults,
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

surveryRouter.get("/getHolland6Results/:id", checkToken, getHolland6Results);

surveryRouter.get("/getMBTIResults/:id", checkToken, getMBTIResults);

surveryRouter.get("/getTheVarkResults/:id", checkToken, getTheVarkResults);

export default surveryRouter;
