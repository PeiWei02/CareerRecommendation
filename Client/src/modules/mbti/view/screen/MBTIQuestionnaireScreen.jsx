import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mbtiQuestionnaire from '../../data/entity/mbtiQuestionnaire.json';
import { MBTIService } from '../../data/source/MBTIService';

export const MBTIQuestionnaireScreen = () => {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    const mbtiQuestion = mbtiQuestionnaire.mbtiQuestionnaire;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate = useNavigate();

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
            <div className="flex flex-col space-y-4 p-8 items-center">
                <div className="text-3xl font-semibold mb-6">MBTI Questionaire</div>

                <Card className="w-[50vw] h-[35vh]">
                    <CardHeader>
                        Question {mbtiQuestion[currentQuestionIndex].id}
                        <CardDescription>{mbtiQuestion[currentQuestionIndex].question}</CardDescription>
                    </CardHeader>

                    <CardFooter className="flex flex-col gap-2 items-start">
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

                        <div className="flex flex-row w-full p-3 gap-4 ">
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
                    </CardFooter>
                </Card>
            </div>
        </Screen>
    );
};
