import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import holland6Questionnaire from '../../data/entity/holland6Questionnaire.json';
import { Holland6Service } from '../../data/source/Holland6Service';

export const Holland6QuestionnaireScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [progress, setProgress] = useState(0);
    const totalQuestionsNumber = holland6Questionnaire.interests.length;

    useEffect(() => {
        if (progress === 100 || answers[totalQuestionsNumber] != undefined) {
            setProgress(100);
            return;
        } else {
            const timer = setTimeout(() => setProgress((currentIndex / totalQuestionsNumber) * 100), 100);
            return () => clearTimeout(timer);
        }
    }, [answers]);

    const next = () => {
        if (currentIndex != totalQuestionsNumber - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handleButtonClick = (response) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentIndex + 1]: response,
        }));

        next();
    };

    const handlePreviousClick = () => {
        if (currentIndex < totalQuestionsNumber) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const buttonColorNo = (currentIndex) => {
        if (answers[currentIndex] !== null) {
            return answers[currentIndex] === '0' ? 'bg-primary hover:bg-primary' : 'hover:bg-primary';
        }
        return 'hover:bg-primary';
    };

    const buttonColorYes = (currentIndex) => {
        if (answers[currentIndex] !== null) {
            return answers[currentIndex] === '1' ? 'bg-primary hover:bg-primary' : 'hover:bg-primary';
        }
        return 'hover:bg-primary';
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
            const data = await Holland6Service(holland6Result, userId);
            const highest = data.highest;
            navigate('/holland6/result', { state: { highest: highest } });
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    return (
        <Screen>
            <div className="flex flex-col items-center w-full py-10 space-y-5">
                <div className="text-3xl font-semibold">Holland&apos;s Six Personality Types</div>
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full items-center justify-center"
                >
                    <Card className="w-[50%]">
                        <CardHeader className="items-center ">
                            <div className="flex-1 text-center">
                                <div className="text-xl">Question {currentIndex + 1}</div>
                                <CardDescription className="text-3xl py-3">
                                    {holland6Questionnaire.interests[currentIndex].description}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="items-center justify-center gap-6">
                            <Button
                                onClick={() => handleButtonClick('0')}
                                className={buttonColorNo(currentIndex + 1)}
                                variant="secondary"
                            >
                                No
                            </Button>
                            <Button
                                onClick={() => handleButtonClick('1')}
                                className={buttonColorYes(currentIndex + 1)}
                                variant="secondary"
                            >
                                Yes
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <div className="flex items-center w-[50%] opacity-80 space-x-5 px-1">
                    <Progress value={progress} />
                    <div className="text-line">{Math.floor(progress)}%</div>
                </div>

                <div className="flex flex-row space-x-2">
                    {currentIndex > 0 && (
                        <div className="items-start">
                            <Button
                                variant="outline"
                                onClick={() => handlePreviousClick()}
                            >
                                Previous
                            </Button>
                        </div>
                    )}
                    {answers[totalQuestionsNumber] !== undefined && (
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
        </Screen>
    );
};
