import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { survey } from "../../../api/authentication/survey.js";
import question from "../components/Question.json";

const Question = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleButtonClick = (response) => {
    console.log(`Interest ${currentIndex + 1}: ${response}`);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentIndex + 1]: response,
    }));
    next();
  };

  const next = () => {
    if (currentIndex != question.interests.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousClick = (response) => {
    console.log(`Interest ${currentIndex + 1}: ${response}`);
    if (currentIndex < question.interests.length) {
      setCurrentIndex(currentIndex - 1);
      console.log("Current question", currentIndex);
    } else {
      console.error("error");
    }
  };

  const buttonColorNo = (currentIndex) => {
    if (answers[currentIndex] !== null) {
      return answers[currentIndex] === "0"
        ? "bg-primary hover:bg-primary"
        : "hover:bg-primary";
    }
    return "hover:bg-primary";
  };

  const buttonColorYes = (currentIndex) => {
    if (answers[currentIndex] !== null) {
      return answers[currentIndex] === "1"
        ? "bg-primary hover:bg-primary"
        : "hover:bg-primary";
    }
    return "hover:bg-primary";
  };

  //TODO Create a function to convert the to Specific JSON file
  const handleSubmit = async () => {
    const holland6Result = {
      Hollan6_Result: {},
    };

    Object.keys(answers).forEach((key) => {
      holland6Result.Hollan6_Result[key] = {
        like: parseInt(answers[key]),
      };
    });

    try {
      const data = await survey(holland6Result);
      const highest = data.highest;
      navigate("/holland6/result", { state: { highest: highest } });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center p-5">
        <div className="text-3xl font-semibold mb-6">
          Holland's Six Personality Types
        </div>
        <Card className="w-[50vw]">
          <CardHeader className="items-center ">
            <div className="flex-1 text-center">
              <div className="text-xl">Question {currentIndex + 1}</div>
              <CardDescription className="text-3xl py-3">
                {question.interests[currentIndex].description}
                {console.log(answers)}
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="items-center justify-center gap-6">
            <Button
              onClick={() => handleButtonClick("0")}
              className={buttonColorNo(currentIndex + 1)}
              variant="secondary"
            >
              No
            </Button>
            <Button
              onClick={() => handleButtonClick("1")}
              className={buttonColorYes(currentIndex + 1)}
              variant="secondary"
            >
              Yes
            </Button>
          </CardFooter>
        </Card>
        <div className="flex justify-content">
          {currentIndex > 0 && (
            <div className="items-start">
              <Button
                variant="ghost"
                onClick={() => handlePreviousClick("Back")}
              >
                Previous
              </Button>
            </div>
          )}
          {answers[question.interests.length] !== undefined && (
            <div className="items-end">
              <Button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600"
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Question;
