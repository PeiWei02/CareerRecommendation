import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const DBConnection = async () => {
  try {
    mongoose.connect(process.env.link);
    const { connection } = mongoose;
    connection.once("open", () => {});
  } catch (error) {
    console.error(`data base connection error`, error);
  }
};
