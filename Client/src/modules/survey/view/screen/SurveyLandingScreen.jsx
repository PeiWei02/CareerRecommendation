import { Button } from '@/components/ui/button';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { Link } from 'react-router-dom';
import { useSurveyCompleted } from '../../domain/useSurveyCompleted';
import { surveyAsset } from '../asset';
import { SurveyLandingListItem } from '../component/SurveyLandingListItem';

export function SurveyLandingScreen() {
    const { data, isSuccess } = useSurveyCompleted();

    if (isSuccess) {
        const { surveyCompleted } = data;

        return (
            <Screen>
                <div className="flex flex-col space-y-4 p-8">
                    <div className="flex flex-col items-start justify-between space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Explore Your Career Path Surveys</h2>
                        <p className="text-muted-foreground">
                            Take the First Step Towards Discovering Your Ideal Career Path!
                        </p>
                    </div>
                    <div className="grid grid-cols-10 gap-1">
                        <div className="col-span-7 flex flex-col flex-grow pt-5 px-6 gap-5 justify-center items-center">
                            <SurveyLandingListItem
                                title="Holland 6"
                                description="Discover your career interests based on Holland's six personality types and find professions that align with your strengths."
                                animation={surveyAsset.Holland6}
                                link="/holland6"
                            />
                            <SurveyLandingListItem
                                title="The Vark"
                                description="Understand your learning preferences with the VARK model to enhance your study or work productivity."
                                animation={surveyAsset.TheVark}
                                link="/theVark"
                            />
                            <SurveyLandingListItem
                                title="Myers-Briggs Type Indicator (MBTI)"
                                description="Explore your personality type with the Myers-Briggs Type Indicator and unlock insights into your career and interpersonal strengths."
                                animation={surveyAsset.MBTI}
                                link="/mbti/question"
                            />
                        </div>

                        <div className="col-span-3 flex flex-col justify-center items-center text-center rounded-lg">
                            {surveyCompleted ? (
                                <div className="flex flex-col gap-y-4 px-10 items-center">
                                    <div className="text-lg font-semibold">
                                        Congratulaion on completed the surveys. You can now unlock your comprehensive
                                        report.
                                    </div>
                                    <Link to="/survey/comprehensiveResult">
                                        <Button className="items-center w-32">Unlock</Button>
                                    </Link>
                                </div>
                            ) : (
                                <p className="text-lg font-semibold">
                                    Please complete all the surveys to unlock your comprehensive report.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}
