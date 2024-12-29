import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useHolland6Results } from '@/modules/holland6/domain/useCase/useHolland6Results';
import { Holland6ResultListItem } from '@/modules/holland6/view/component/Holland6ResultListItem';
import { useMBTIResults } from '@/modules/mbti/domain/useCase/useMBTIResults';
import { MBTIResultListItem } from '@/modules/mbti/view/component/MBTIResultListItem';
import { useComprehensiveReport } from '@/modules/survey/domain/useCase/useComprehensiveReport';
import { SurveyCareerListItem } from '@/modules/survey/view/component/SurveyCareerListItem';
import { SurveyLearningListItem } from '@/modules/survey/view/component/SurveyLearningListItem';
import { theVarkResult } from '@/modules/theVark/data/entity/theVarkResult';
import { useTheVarkResults } from '@/modules/theVark/domain/useCase/useTheVarkResults';
import { TheVarkResultListItem } from '@/modules/theVark/view/component/TheVarkResultListItem';
import { ErrorModal } from '@/platform/customComponents/error/ErrorModal';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import Lottie from 'lottie-react';
import { History } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { userManagementAsset } from '../asset';

export function UserManagementAnalyticScreen() {
    const location = useLocation();
    const { _id: userId, name } = location.state;

    const {
        data: comprehensiveData,
        isError: isComprehensiveError,
        isSuccess: isComprehensiveSuccess,
        isFetching: isComprehensiveFetching,
    } = useComprehensiveReport(userId);
    const { data: holland6Data, isError: isHolland6Error, isFetching: isHolland6Fetching } = useHolland6Results(userId);
    const { data: mbtiData, isError: isMBTIError, isFetching: isMBTIFetching } = useMBTIResults(userId);
    const { data: theVarkData, isError: isTheVarkError, isFetching: isTheVarkFetching } = useTheVarkResults(userId);

    const renderAttemptHistory = ({ data, title, ResultListItem }) => {
        const latestAttemptId = data[0]?._id;

        return (
            <Card className="flex flex-col w-full h-[55vh]">
                <ScrollArea className="h-[55vh] w-full">
                    <CardHeader>
                        <CardTitle className="flex flex-row space-x-1 items-center text-xl">
                            <History size={24} />
                            <p>{title}</p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {data.length > 0 ? (
                            data.map((item) => (
                                <ResultListItem
                                    key={item._id}
                                    item={item}
                                    latestAttemptId={latestAttemptId}
                                />
                            ))
                        ) : (
                            <div>No Historical Data found</div>
                        )}
                    </CardContent>
                </ScrollArea>
            </Card>
        );
    };

    const renderSuggestedJobs = () => {
        //TODO: the empty or not found state should be handled in backend
        if (isComprehensiveError) {
            return (
                <div className="flex flex-col justify-center items-center w-full h-full">
                    <Lottie
                        animationData={userManagementAsset.notFound}
                        style={{ width: '100%' }}
                    ></Lottie>
                    <div>The user has not completed all the tests yet.</div>
                </div>
            );
        }

        if (isComprehensiveSuccess) {
            const { holland6SuggestedJobs, mbtiSuggestedJobs, TheVarkResult } = comprehensiveData;
            const theVarkInfo = theVarkResult[TheVarkResult.highest];

            return (
                <ScrollArea className="h-[70vh] w-full">
                    {holland6SuggestedJobs.length > 0 && (
                        <div className="py-4 space-y-8">
                            <h2 className="text-2xl font-semibold border-b border-primary pb-3">
                                Holland 6 Suggested Jobs
                            </h2>
                            {holland6SuggestedJobs.map((jobInfo) => (
                                <SurveyCareerListItem
                                    jobInfo={jobInfo}
                                    key={jobInfo.id}
                                />
                            ))}
                        </div>
                    )}

                    {mbtiSuggestedJobs.length > 0 && (
                        <div className="py-4 space-y-8">
                            <h2 className="text-2xl font-semibold border-b border-primary pb-3">MBTI Suggested Jobs</h2>
                            {mbtiSuggestedJobs.map((jobInfo) => (
                                <SurveyCareerListItem
                                    jobInfo={jobInfo}
                                    key={jobInfo.id}
                                />
                            ))}
                        </div>
                    )}

                    {theVarkInfo && (
                        <div className="py-4 space-y-8">
                            <h2 className="text-2xl font-semibold border-b border-primary pb-3">
                                The Vark Suggested Learning
                            </h2>
                            <SurveyLearningListItem learningInfo={theVarkInfo} />
                        </div>
                    )}
                </ScrollArea>
            );
        }
    };

    if (isComprehensiveFetching || isHolland6Fetching || isMBTIFetching || isTheVarkFetching) {
        return (
            <Screen>
                <LoadingModal />
            </Screen>
        );
    }

    if (isHolland6Error || isMBTIError || isTheVarkError) {
        return (
            <Screen>
                <ErrorModal />
            </Screen>
        );
    }

    return (
        <Screen>
            <div className="flex flex-col space-y-4 p-8">
                <div className="flex flex-col items-start justify-between space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">User Analytics Overview</h2>
                    <p className="text-muted-foreground">
                        Gain insights into individual user performance and engagement to enhance their career
                        development and support their journey towards success.
                    </p>
                </div>

                <div className="grid grid-cols-10 gap-1">
                    <div className="col-span-6 flex">
                        <div className="flex flex-col space-y-3">
                            <div className="flex flex-col p-2">
                                <h1 className="text-xl font-bold tracking-tight">Username: {name}</h1>
                                <h1 className="text-xl font-bold tracking-tight">UserId: {userId}</h1>
                            </div>
                            <div className="flex flex-row gap-x-4 py-5 justify-center items-center rounded-lg">
                                {renderAttemptHistory({
                                    data: holland6Data,
                                    title: 'Holland6 Attempts History',
                                    ResultListItem: Holland6ResultListItem,
                                })}

                                {renderAttemptHistory({
                                    data: mbtiData,
                                    title: 'MBTI Attempts History',
                                    ResultListItem: MBTIResultListItem,
                                })}

                                {renderAttemptHistory({
                                    data: theVarkData,
                                    title: 'The Vark Attempts History',
                                    ResultListItem: TheVarkResultListItem,
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-4 px-6 max-w-6xl">{renderSuggestedJobs()}</div>
                </div>
            </div>
        </Screen>
    );
}
