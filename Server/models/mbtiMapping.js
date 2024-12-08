import mongoose from "mongoose";

const Schema = mongoose.Schema;

//TODO: remove this schema
const mbtiMappingSchema = new Schema(
  {
    mbtiType: {
      type: String,
      required: true,
    },
    mbtiDescription: {
      type: String,
      required: true,
    },
    personalityTraits: {
      type: String,
      required: true,
    },
    topCareers: {
      type: String,
      required: true,
    },
    jobCode: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "mbti_mapping",
  }
);

const MbtiMapping = mongoose.model("MBTIMapping", mbtiMappingSchema);

export default MbtiMapping;
