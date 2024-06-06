import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Holland6Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    highest: {
      type: String,
      require: true,
    },
    result: {
      type: Object,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Holland6 = mongoose.model("Holland6", Holland6Schema);

export default Holland6;
