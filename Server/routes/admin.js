import express from "express";
import { checkAdminRole } from "../controllers/admin.js";

const adminRouter = express.Router();

adminRouter.post("/checkAdminRole", checkAdminRole);

export default adminRouter;
