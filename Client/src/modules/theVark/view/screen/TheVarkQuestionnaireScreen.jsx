import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theVarkQuestionnaire from '../../data/entity/theVarkQuestionnaire.json';
import { theVarkResultService } from '../../data/source/TheVarkResultService';

export function TheVarkQuestionnaireScreen() {
    const { toast } = useToast();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [progress, setProgress] = useState(1);
    const theVarkQuestions = theVarkQuestionnaire.theVarkQuestionnaire;
    const totalQuestionsNumber = theVarkQuestions.length;

    useEffect(() => {
        if (progress === 100 || answers[15] != undefined) {
            setProgress(100);
            return;
        } else {
            console.log(currentQuestionIndex);
            const timer = setTimeout(() => setProgress((currentQuestionIndex / totalQuestionsNumber) * 100), 100);
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, answers]);

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex].length === 0) {
            toast({
                title: 'Failed!',
                description: 'You must choose atleast 1 option',
                status: 'error',
                variant: 'destructive',
            });
            return;
        }

        if (currentQuestionIndex < theVarkQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const saveResult = (response) => {
        setAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[currentQuestionIndex] || [];
            const updatedAnswers = currentAnswers.includes(response)
                ? currentAnswers.filter((ans) => ans !== response)
                : [...currentAnswers, response];

            return {
                ...prevAnswers,
                [currentQuestionIndex]: updatedAnswers,
            };
        });
    };

    const buttonColor = (optionsValue) => {
        const currentAnswers = answers[currentQuestionIndex] || [];
        return currentAnswers.includes(optionsValue) ? 'bg-primary hover:bg-primary' : 'hover:bg-primary/50';
    };

    const submitAnswer = async (answers) => {
        try {
            const data = await theVarkResultService(answers, userId);
            const highest = data.highest;
            navigate('/theVark/result', { state: { highest: highest } });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Screen>
            <div className="flex flex-col items-center w-full py-10 space-y-5">
                <div className="text-3xl font-semibold">The VARK Learning Styles</div>
                <motion.div
                    key={currentQuestionIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full items-center justify-center"
                >
                    <Card className="w-[60%]">
                        <CardHeader>
                            <div className="flex-1 text-center px-8">
                                <div className="text-xl"> Question {theVarkQuestions[currentQuestionIndex].id}</div>
                                <CardDescription className="text-2xl py-3">
                                    {theVarkQuestions[currentQuestionIndex].question}
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex flex-col gap-2 px-10 items-center">
                            <Button
                                onClick={() => saveResult('A')}
                                className={buttonColor('A')}
                                variant="secondary"
                            >
                                A. {theVarkQuestions[currentQuestionIndex].options.a}
                            </Button>
                            <Button
                                onClick={() => saveResult('B')}
                                className={buttonColor('B')}
                                variant="secondary"
                            >
                                B. {theVarkQuestions[currentQuestionIndex].options.b}
                            </Button>
                            <Button
                                onClick={() => saveResult('C')}
                                className={buttonColor('C')}
                                variant="secondary"
                            >
                                C. {theVarkQuestions[currentQuestionIndex].options.c}
                            </Button>
                            <Button
                                onClick={() => saveResult('D')}
                                className={buttonColor('D')}
                                variant="secondary"
                            >
                                D. {theVarkQuestions[currentQuestionIndex].options.d}
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
                        <Button
                            onClick={handlePrevious}
                            variant="outline"
                        >
                            Previous
                        </Button>
                    )}
                    {answers[theVarkQuestions.length - 1] !== undefined &&
                    currentQuestionIndex == theVarkQuestions.length - 1 ? (
                        <Button
                            onClick={() => submitAnswer(answers)}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            variant="outline"
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </Screen>
    );
}
