import express from "express";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  signUp,
} from "../controllers/user.js";
import { checkRole, checkToken } from "../middlewares/middlewares.js";

const authRouter = express.Router();

authRouter.post("/signUp", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", checkToken, logout);
authRouter.post("/checkAuth", checkAuth);
authRouter.get("/getAllUsers", checkToken, checkRole(["admin"]), getAllUsers);

export default authRouter;
