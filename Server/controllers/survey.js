import axios from "axios";
import * as cheerio from "cheerio";
import JobDetails from "../models/jobDetails.js";
import MbtiMapping from "../models/mbtiMapping.js";
import Holland6 from "../models/survery/Holland6.js";
import MBTI from "../models/survery/MBTI.js";
import TheVark from "../models/survery/TheVark.js";
import { RIASEC_Calculator } from "../surveyFrameworks/HollandSix/calculator.js";
import { MBTICalculator } from "../surveyFrameworks/MBTI/MBTICalculator.js";
import { TheVarkCalculator } from "../surveyFrameworks/TheVark/TheVarkCalculator.js";

//TODO: remove highest
export const createHollan6Result = async (req, res) => {
  try {
    const result = RIASEC_Calculator(req.body);
    const { id } = req.params;
    const Holland6_Result = await Holland6.create({
      userId: id,
      highest: result.highest,
      highestCombination: result.highestCombination,
      result: result.result,
    });
    res.status(200).json(Holland6_Result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTheVarkResult = async (req, res) => {
  try {
    const result = TheVarkCalculator(req.body);
    const { id } = req.params;
    const TheVarkResult = await TheVark.create({
      userId: id,
      highest: result.highest,
      result: result.result,
    });
    res.status(200).json(TheVarkResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMBTIResult = async (req, res) => {
  try {
    const result = MBTICalculator(req.body);
    const { id } = req.params;
    const MBTIResult = await MBTI.create({
      userId: id,
      highest: result.highest,
      result: result.result,
    });
    res.status(200).json(MBTIResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkSurveyCompleted = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const holland6Result = await Holland6.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const MBTIResult = await MBTI.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const TheVarkResult = await TheVark.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    const isHolland6Completed = !!holland6Result;
    const isMBTICompleted = !!MBTIResult;
    const isTheVarkCompleted = !!TheVarkResult;

    const totalTestCompleted = [
      isHolland6Completed,
      isMBTICompleted,
      isTheVarkCompleted,
    ].filter(Boolean).length;

    return res.status(200).json({
      testCompleted: {
        isHolland6Completed,
        isMBTICompleted,
        isTheVarkCompleted,
      },
      totalTestCompleted,
    });
  } catch (error) {
    console.error("Error in checkSurveyCompleted:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHolland6Results = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const holland6Results = await Holland6.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(holland6Results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMBTIResults = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const MBTIResults = await MBTI.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(MBTIResults);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTheVarkResults = async (req, res) => {
  const { id: userId } = req.params;

  try {
    const theVarkResults = await TheVark.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(theVarkResults);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//TODO: Refactor this function and the complete result function
const fetchJobDetails = async (jobCode, jobName) => {
  const url = `https://www.onetonline.org/link/summary/${jobCode}`;

  try {
    const response = await axios.get(url);

    if (response.status !== 200) {
      console.error(`Failed to fetch data for jobCode: ${jobCode}`);
      return null;
    }

    const htmlContent = response.data;
    const $ = cheerio.load(htmlContent);

    const extractSectionData = (sectionId) => {
      const section = $(`#${sectionId}`);
      const items = section.find("li");
      return items
        .map((_, item) => $(item).find(".order-2").text().trim())
        .get();
    };

    return {
      JobCode: jobCode,
      JobName: jobName,
      OccupationName: $("h1 .main").text().trim(),
      Tasks: extractSectionData("Tasks"),
      TechnologySkills: extractSectionData("TechnologySkills"),
      WorkActivities: extractSectionData("WorkActivities"),
      Skills: extractSectionData("Skills"),
      Knowledge: extractSectionData("Knowledge"),
    };
  } catch (err) {
    console.error(`Error fetching data for jobCode ${jobCode}:`, err.message);
    return null;
  }
};

const generatePermutations = (codes) => {
  const results = [];
  const helper = (arr, prefix = "") => {
    if (prefix.length === 3) {
      results.push(prefix);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      helper(arr.slice(0, i).concat(arr.slice(i + 1)), prefix + arr[i]);
    }
  };
  helper(codes);
  return results;
};

export const createCompleteResult = async (req, res) => {
  const { id: userId } = req.params;

  try {
    // Fetch the most recent Holland6 result
    const holland6Result = await Holland6.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!holland6Result) {
      return res
        .status(404)
        .json({ message: "Holland6 results not found for the user." });
    }

    // Fetch the most recent MBTI result
    const MBTIResult = await MBTI.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!MBTIResult) {
      return res
        .status(404)
        .json({ message: "MBTI results not found for the user." });
    }

    const TheVarkResult = await TheVark.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    console.log("TheVark Result:", TheVarkResult);

    // Fetch jobs for the highest combination
    const holland6Jobs = await JobDetails.find({
      holland6InterestCode: holland6Result.highestCombination,
    }).lean();
    console.log("Holland6 Jobs for highest combination:", holland6Jobs);

    const holland6SuggestedJobs = [];

    if (holland6Jobs.length === 0) {
      // Generate alternative permutations
      const alternatives = generatePermutations(
        holland6Result.highestCombination.split("")
      );
      console.log("Generated alternatives:", alternatives);

      for (const alternative of alternatives) {
        const jobs = await JobDetails.find({
          holland6InterestCode: alternative,
        }).lean();

        if (jobs.length > 0) {
          console.log(`Jobs found for ${alternative}:`, jobs);

          // Fetch job details in parallel
          const jobDetailsPromises = jobs.map((job) =>
            fetchJobDetails(job.jobCode, job.jobName)
          );
          const resolvedDetails = await Promise.all(
            jobDetailsPromises.map((p) => p.catch(() => null)) // Catch individual errors
          );

          holland6SuggestedJobs.push(
            ...resolvedDetails.filter((details) => details)
          );

          // break; // Stop searching once jobs are found
        } else {
          console.log(`No jobs found for ${alternative}, skipping...`);
        }
      }

      // If no jobs are found for any combination
      if (holland6SuggestedJobs.length === 0) {
        console.log("No jobs found for any alternative.");
        return res
          .status(404)
          .json({ message: "No jobs found for the user's Holland6 type." });
      }
    } else {
      // Fetch job details for the initial combination
      const jobDetailsPromises = holland6Jobs.map((job) =>
        fetchJobDetails(job.jobCode, job.jobName)
      );
      const resolvedDetails = await Promise.all(
        jobDetailsPromises.map((p) => p.catch(() => null)) // Catch individual errors
      );

      holland6SuggestedJobs.push(
        ...resolvedDetails.filter((details) => details)
      );
    }

    // Fetch jobs suggested by MBTI
    const mbtiMapping = await MbtiMapping.find({
      mbtiType: MBTIResult.highest,
    }).lean();

    if (mbtiMapping.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found for the user's MBTI type." });
    }

    const mbtiSuggestedJobs = [];
    for (const mapping of mbtiMapping) {
      const jobDetails = await fetchJobDetails(
        mapping.jobCode,
        mapping.topCareers
      );
      if (jobDetails) mbtiSuggestedJobs.push(jobDetails);
    }

    // Respond with the combined results
    res.status(200).json({
      holland6SuggestedJobs,
      mbtiSuggestedJobs,
      TheVarkResult,
    });
  } catch (error) {
    console.error("Error creating complete result:", error.message);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};
