import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import theVarkQuestionnaire from '../../data/entity/theVarkQuestionnaire.json';
import { theVarkResultService } from '../../data/source/TheVarkResultService';

export const TheVarkQuestionList = () => {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;
    const theVarkQuestions = theVarkQuestionnaire.theVarkQuestionnaire;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const { toast } = useToast();
    const navigate = useNavigate();

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
        <Card className="w-[50vw] h-[50vh]">
            <CardHeader>
                Question {theVarkQuestions[currentQuestionIndex].id}
                <CardDescription>{theVarkQuestions[currentQuestionIndex].question}</CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col gap-2 items-start">
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

                <div className="flex flex-row w-full p-3 gap-4 ">
                    <Button
                        onClick={handlePrevious}
                        variant="outline"
                    >
                        Previous
                    </Button>
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
            </CardFooter>
        </Card>
    );
};
