import mongoose from "mongoose";

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    jobName: {
      type: String,
      require: true,
    },
    company: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    contactEmail: {
      type: String,
      require: true,
    },
    contactNumber: {
      type: String,
      require: true,
    },
    jobDescription: {
      type: String,
      require: true,
    },
    salaryRange: {
      type: String,
      require: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    experience: {
      type: String,
      require: true,
    },
    qualification: {
      type: String,
      require: true,
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
