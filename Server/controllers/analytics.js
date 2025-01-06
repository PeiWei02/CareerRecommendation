import mongoose from "mongoose";
import Holland6 from "../models/survery/Holland6.js";
import MBTI from "../models/survery/MBTI.js";
import TheVark from "../models/survery/TheVark.js";
import User from "../models/user.js";

export const getUserGrowth = async (req, res) => {
  try {
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedData = userGrowth.map((data) => ({
      year: data._id.year,
      month: months[data._id.month - 1],
      count: data.count,
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSurveyCompletionRate = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const completedSurveys = await User.countDocuments({ survey: true });

    const completionRate =
      totalUsers > 0 ? (completedSurveys / totalUsers) * 100 : 0;

    res.status(200).json({
      totalUsers,
      completedSurveys,
      completionRate: completionRate.toFixed(2),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMostCommonVarkResults = async (req, res) => {
  try {
    const varkResults = await TheVark.aggregate([
      { $group: { _id: "$highest", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);

    res.status(200).json(varkResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMostCommonMbtiResults = async (req, res) => {
  try {
    const mbtiResults = await MBTI.aggregate([
      { $group: { _id: "$highest", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    res.status(200).json(mbtiResults);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMostCommonHolland6Results = async (req, res) => {
  try {
    const holland6Results = await Holland6.aggregate([
      { $group: { _id: "$highest", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);

    res.status(200).json(holland6Results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTotalTestsDone = async (req, res) => {
  try {
    const varkCount = await TheVark.countDocuments();
    const mbtiCount = await MBTI.countDocuments();
    const holland6Count = await Holland6.countDocuments();

    res.status(200).json({
      results: [
        { test: "the vark", count: varkCount },
        { test: "mbti", count: mbtiCount },
        { test: "holland 6", count: holland6Count },
      ],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSurveysCompletedByModuleAndMonth = async (req, res) => {
  try {
    const vark = await TheVark.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    const mbti = await MBTI.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    const holland6 = await Holland6.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({ vark, mbti, holland6 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const withTransaction = async (callback, session) => {
  let retryAttempts = 3;

  while (retryAttempts > 0) {
    try {
      session.startTransaction();
      await callback();
      await session.commitTransaction();
      return; // Exit if transaction succeeds
    } catch (error) {
      if (
        error.hasErrorLabel("TransientTransactionError") &&
        retryAttempts > 0
      ) {
        retryAttempts--;
        continue; // Retry the transaction
      }
      throw error; // Rethrow the error if not transient
    }
  }
};

export const getAnalyticsOverview = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    await withTransaction(async () => {
      const [varkCount, mbtiCount, holland6Count] = await Promise.all([
        TheVark.countDocuments().session(session),
        MBTI.countDocuments().session(session),
        Holland6.countDocuments().session(session),
      ]);

      const chartData = [
        { test: "vark", count: varkCount },
        { test: "mbti", count: mbtiCount },
        { test: "holland6", count: holland6Count },
      ];

      const userGrowth = await User.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]).session(session);

      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const userChartData = userGrowth.map((data) => ({
        year: data._id.year,
        month: months[data._id.month - 1],
        count: data.count,
      }));

      const [holland6ChartData, varkChartData, mbtiChartData] =
        await Promise.all([
          Holland6.aggregate([
            { $group: { _id: "$highest", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 },
          ]).session(session),
          TheVark.aggregate([
            { $group: { _id: "$highest", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 4 },
          ]).session(session),
          MBTI.aggregate([
            { $group: { _id: "$highest", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 },
          ]).session(session),
        ]);

      res.status(200).json({
        chartData,
        userChartData,
        holland6ChartData,
        varkChartData,
        mbtiChartData,
      });
    }, session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};
