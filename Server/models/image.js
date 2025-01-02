import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    filename: String,
    contentType: String,
    data: Buffer,
  },
  {
    timestamps: true,
  }
);

const ImageFile = mongoose.model("Image", fileSchema);

export default ImageFile;
