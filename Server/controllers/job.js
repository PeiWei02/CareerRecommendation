import ImageFile from "../models/image.js";
import Job from "../models/job.js";

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({}).sort({ updatedAt: -1 });

    if (!jobs.length) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const createJobs = async (req, res) => {
  let imageId = null;

  try {
    const imageFile = new ImageFile({
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      data: req.file.buffer,
    });
    await imageFile.save();

    imageId = imageFile._id;
  } catch (err) {
    console.error("Error uploading image", err);
    return res.status(500).json({ message: "Error uploading job image" });
  }

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Job data is required" });
    }

    const jobData = {
      ...req.body,
      image: imageId,
    };

    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({ message: "Validation error", details: error.errors });
    }
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const updateJob = async (req, res) => {
  let imageId = null;

  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (req.file) {
      try {
        const imageFile = new ImageFile({
          filename: req.file.originalname,
          contentType: req.file.mimetype,
          data: req.file.buffer,
        });
        await imageFile.save();

        imageId = imageFile._id;
      } catch (err) {
        console.error("Error uploading image", err);
        return res.status(500).json({ message: "Error uploading job image" });
      }
    }

    const updatedJobData = {
      ...req.body,
      ...(imageId && { image: imageId }),
    };

    const updatedJob = await Job.findByIdAndUpdate(id, updatedJobData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(updatedJob);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({ message: "Validation error", details: error.errors });
    }
    res.status(500).json({ message: "Server error", details: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Job ID format" });
    }
    res.status(500).json({ message: "Server error", details: error.message });
  }
};
