import express from "express";
import { deleteUser } from "../controllers/userManagement.js";
import { checkRole, checkToken } from "../middlewares/middlewares.js";

const userManagementRouter = express.Router();

userManagementRouter.delete(
  "/deleteUser",
  checkToken,
  checkRole(["admin"]),
  deleteUser
);

export default userManagementRouter;
