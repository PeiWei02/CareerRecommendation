import express from "express";
import { createHollan6Result } from "../controllers/survey.js";
import { checkToken } from "../middlewares/middlewares.js";

const surveryRouter = express.Router();

surveryRouter.post("/:id/holland6Result", checkToken, createHollan6Result);

export default surveryRouter;
