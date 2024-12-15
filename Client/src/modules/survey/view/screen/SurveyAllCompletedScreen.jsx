import { theVarkResult } from '@/modules/theVark/data/entity/theVarkResult';
import { ErrorModal } from '@/platform/customComponents/error/ErrorModal';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useComprehensiveReport } from '../../domain/useCase/useComprehensiveReport';
import { SurveyCareerListItem } from '../component/SurveyCareerListItem';
import { SurveyLearningListItem } from '../component/SurveyLearningListItem';

export function SurveyAllCompletedScreen() {
    const { data, isError, isSuccess, isFetching } = useComprehensiveReport();

    if (isError) {
        return (
            <Screen>
                <ErrorModal />
            </Screen>
        );
    }

    if (isFetching) {
        return (
            <Screen>
                <LoadingModal />
            </Screen>
        );
    }

    if (isSuccess && data) {
        const { holland6SuggestedJobs, mbtiSuggestedJobs, TheVarkResult } = data;
        //TODO: put the mapping on the backend
        const theVarkInfo = theVarkResult[TheVarkResult.highest];

        return (
            <Screen>
                <div className="flex flex-col space-y-4 p-8">
                    <div className="flex flex-col items-start justify-between space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight">Unlock Your Dream Career</h2>
                        <p className="text-muted-foreground">
                            Discover your ideal career path and take the first step towards a fulfilling future.
                        </p>
                    </div>

                    <div className="items-start">
                        {holland6SuggestedJobs.length > 0 && (
                            <>
                                <h2 className="text-2xl font-bold tracking-tight pt-5">Holland 6 suggested jobs</h2>
                                {holland6SuggestedJobs.map((jobInfo) => (
                                    <SurveyCareerListItem
                                        jobInfo={jobInfo}
                                        key={jobInfo.id}
                                    />
                                ))}
                            </>
                        )}
                        {mbtiSuggestedJobs.length > 0 && (
                            <>
                                <h2 className="text-2xl font-bold tracking-tight">MBTI suggested jobs:</h2>
                                {mbtiSuggestedJobs.map((jobInfo) => (
                                    <SurveyCareerListItem
                                        jobInfo={jobInfo}
                                        key={jobInfo.id}
                                    />
                                ))}
                            </>
                        )}
                        {theVarkInfo && (
                            <>
                                <h2 className="text-2xl font-bold tracking-tight">The Vark suggested learning:</h2>
                                <SurveyLearningListItem learningInfo={theVarkInfo} />
                            </>
                        )}
                    </div>
                </div>
            </Screen>
        );
    }
}
