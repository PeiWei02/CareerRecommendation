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

    if (holland6Result && MBTIResult && TheVarkResult) {
      return res.status(200).json({ surveyCompleted: true });
    }

    return res.status(200).json({ surveyCompleted: false });
  } catch (error) {
    console.error("Error in checkSurveyCompleted:", error);
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

    // Fetch jobs suggested by Holland6
    const holland6Jobs = await JobDetails.find({
      holland6InterestCode: holland6Result.highestCombination,
    }).lean();

    const holland6SuggestedJobs = [];
    for (const job of holland6Jobs) {
      const jobDetails = await fetchJobDetails(job.jobCode, job.jobName);
      if (jobDetails) holland6SuggestedJobs.push(jobDetails);
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
    });
  } catch (error) {
    console.error("Error creating complete result:", error.message);
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};
