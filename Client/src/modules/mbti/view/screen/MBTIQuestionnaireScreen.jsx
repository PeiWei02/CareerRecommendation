import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mbtiQuestionnaire from '../../data/entity/mbtiQuestionnaire.json';
import { MBTIService } from '../../data/source/MBTIService';

export const MBTIQuestionnaireScreen = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [progress, setProgress] = useState(0);
    const mbtiQuestion = mbtiQuestionnaire.mbtiQuestionnaire;
    const totalQuestionsNumber = mbtiQuestion.length;

    useEffect(() => {
        if (progress === 100 || answers[totalQuestionsNumber] != undefined) {
            setProgress(100);
            return;
        } else {
            const timer = setTimeout(() => setProgress((currentQuestionIndex / totalQuestionsNumber) * 100), 100);
            return () => clearTimeout(timer);
        }
    }, [answers]);

    const handleButtonClick = (response) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [currentQuestionIndex + 1]: response,
        }));
        next();
    };

    const next = () => {
        if (currentQuestionIndex != mbtiQuestion.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const buttonA = (currentIndex) => {
        if (answers[currentIndex] !== null) {
            return answers[currentIndex] === 'A' ? 'bg-primary hover:bg-primary' : 'hover:bg-primary';
        }
        return 'hover:bg-primary';
    };

    const buttonB = (currentIndex) => {
        if (answers[currentIndex] !== null) {
            return answers[currentIndex] === 'B' ? 'bg-primary hover:bg-primary' : 'hover:bg-primary';
        }
        return 'hover:bg-primary';
    };

    const submitAnswer = async (answers) => {
        try {
            const data = await MBTIService(answers, userId);
            const highest = data.highest;
            navigate('/mbti/result', { state: { highest: highest } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Screen>
            <div className="flex flex-col items-center w-full py-10 space-y-5">
                <div className="text-3xl font-semibold">MBTI Questionaire</div>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full items-center justify-center"
                >
                    <Card className="w-[50%]">
                        <CardHeader className="items-center">
                            <div className="flex-1 text-center">
                                <div className="text-xl">Question {mbtiQuestion[currentQuestionIndex].id}</div>
                                <CardDescription className="text-3xl py-3">
                                    {mbtiQuestion[currentQuestionIndex].question}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex flex-col gap-2 items-center">
                            <Button
                                onClick={() => handleButtonClick('A')}
                                className={buttonA(currentQuestionIndex + 1)}
                                variant="secondary"
                            >
                                A. {mbtiQuestion[currentQuestionIndex].choices.A}
                            </Button>
                            <Button
                                onClick={() => handleButtonClick('B')}
                                className={buttonB(currentQuestionIndex + 1)}
                                variant="secondary"
                            >
                                B. {mbtiQuestion[currentQuestionIndex].choices.B}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <div className="flex items-center w-[50%] opacity-80 space-x-5 px-1">
                    <Progress value={progress} />
                    <div className="text-line">{Math.floor(progress)}%</div>
                </div>

                <div className="flex flex-row space-x-2">
                    {currentQuestionIndex > 0 && (
                        <div className="items-start">
                            <Button
                                variant="outline"
                                onClick={() => handlePrevious('Back')}
                            >
                                Previous
                            </Button>
                        </div>
                    )}

                    {answers[mbtiQuestion.length] !== undefined && (
                        <div className="items-end">
                            <Button
                                onClick={() => submitAnswer(answers)}
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
