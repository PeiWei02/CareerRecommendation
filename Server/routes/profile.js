import express from "express";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../controllers/profile.js";
import { checkToken } from "../middlewares/middlewares.js";

const profileRouter = express.Router();

profileRouter.get("/:id", checkToken, getProfile);

profileRouter.put("/:id/updateProfile", checkToken, updateProfile);

profileRouter.put("/:id/updatePassword", checkToken, updatePassword);

export default profileRouter;
