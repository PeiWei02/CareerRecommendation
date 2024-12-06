import express from "express";
import {
  getAnalyticsOverview,
  getMostCommonHolland6Results,
  getMostCommonMbtiResults,
  getMostCommonVarkResults,
  getSurveyCompletionRate,
  getSurveysCompletedByModuleAndMonth,
  getTotalTestsDone,
  getUserGrowth,
} from "../controllers/analytics.js";
import { checkRole, checkToken } from "../middlewares/middlewares.js";

const analyticsRouter = express.Router();

analyticsRouter.get(
  "/getUserGrowth",
  checkToken,
  checkRole(["admin"]),
  getUserGrowth
);

analyticsRouter.get(
  "/getSurveyCompletionRate",
  checkToken,
  checkRole(["admin"]),
  getSurveyCompletionRate
);

analyticsRouter.get(
  "/getMostCommonVarkResults",
  checkToken,
  checkRole(["admin"]),
  getMostCommonVarkResults
);

analyticsRouter.get(
  "/getMostCommonMbtiResults",
  checkToken,
  checkRole(["admin"]),
  getMostCommonMbtiResults
);

analyticsRouter.get(
  "/getMostCommonHolland6Results",
  checkToken,
  checkRole(["admin"]),
  getMostCommonHolland6Results
);

analyticsRouter.get(
  "/getTotalTestsDone",
  checkToken,
  checkRole(["admin"]),
  getTotalTestsDone
);

analyticsRouter.get(
  "/getSurveysCompletedByModuleAndMonth",
  checkToken,
  checkRole(["admin"]),
  getSurveysCompletedByModuleAndMonth
);

analyticsRouter.get(
  "/getAnalyticsOverview",
  checkToken,
  checkRole(["admin"]),
  getAnalyticsOverview
);

export default analyticsRouter;
