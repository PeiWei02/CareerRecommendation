import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobDetailsSchema = new Schema(
  {
    holland6InterestCode: {
      type: String,
      required: true,
    },
    jobLevel: {
      type: Number,
      required: true,
    },
    jobCode: {
      type: String,
      required: true,
    },
    jobName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "job_details",
  }
);

const JobDetails = mongoose.model("JobDetails", jobDetailsSchema);

export default JobDetails;
