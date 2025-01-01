import express from "express";
import multer from "multer";
import {
  checkAuth,
  getAllUsers,
  login,
  logout,
  signUp,
} from "../controllers/user.js";
import { checkRole, checkToken } from "../middlewares/middlewares.js";

const upload = multer({ storage: multer.memoryStorage() });
const authRouter = express.Router();

authRouter.post("/signUp", upload.single("profilePicture"), signUp);
authRouter.post("/login", login);
authRouter.post("/logout", checkToken, logout);
authRouter.post("/checkAuth", checkAuth);
authRouter.get("/getAllUsers", checkToken, checkRole(["admin"]), getAllUsers);

export default authRouter;
