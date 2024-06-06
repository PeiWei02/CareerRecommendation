import Holland6 from "../models/survery/Holland6.js";
import { RIASEC_Calculator } from "../surveyFrameworks/HollandSix/calculator.js";

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
