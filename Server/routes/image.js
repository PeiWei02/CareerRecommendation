import express from "express";
import multer from "multer";
import { getImage, uploadImage } from "../controllers/image.js";
import { checkToken } from "../middlewares/middlewares.js";

const upload = multer({ storage: multer.memoryStorage() });
const imageRouter = express.Router();

imageRouter.post("/upload", checkToken, upload.single("image"), uploadImage);
imageRouter.get("/:id", checkToken, getImage);

export default imageRouter;
