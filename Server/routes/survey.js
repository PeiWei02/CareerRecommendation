import express from "express";
import { createHollan6Result, createTheVarkResult } from "../controllers/survey.js";
import { checkToken } from "../middlewares/middlewares.js";

const surveryRouter = express.Router();

surveryRouter.post("/:id/holland6Result", checkToken, createHollan6Result);

surveryRouter.post("/:id/theVarkResult", checkToken, createTheVarkResult);

export default surveryRouter;
