import Holland6 from "../models/survery/Holland6.js";
import MBTI from "../models/survery/MBTI.js";
import TheVark from "../models/survery/TheVark.js";
import { RIASEC_Calculator } from "../surveyFrameworks/HollandSix/calculator.js";
import { MBTICalculator } from "../surveyFrameworks/MBTI/MBTICalculator.js";
import { TheVarkCalculator } from "../surveyFrameworks/TheVark/TheVarkCalculator.js";

export const createHollan6Result = async (req, res) => {
  try {
    const result = RIASEC_Calculator(req.body);
    const { id } = req.params;
    const Holland6_Result = await Holland6.create({
      userId: id,
      highest: result.highest,
      result: result.result,
    });
    res.status(200).json(Holland6_Result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTheVarkResult = async(req, res) => {
  try {
    const result = TheVarkCalculator(req.body);
    const {id} = req.params;
    const TheVarkResult = await TheVark.create({
      userId: id,
      highest:result.highest,
      result:result.result
    })
    res.status(200).json(TheVarkResult)
  } catch (error) {
      res.status(500).json({message:error.message})
  }
}

export const createMBTIResult = async(req,res) => { 
  try {
    const result = MBTICalculator(req.body);
    const {id} = req.params;
    const MBTIResult = await MBTI.create({
      userId: id,
      highest:result.highest,
      result:result.result
    })
    res.status(200).json(MBTIResult)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}