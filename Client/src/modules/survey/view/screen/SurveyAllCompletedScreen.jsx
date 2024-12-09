import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useComprehensiveReport } from '../../domain/useComprehensiveReport';
import { SurveyCareerListItem } from '../component/SurveyCareerListItem';

export function SurveyAllCompletedScreen() {
    const { data, isError, isSuccess, isFetching } = useComprehensiveReport();

    if (isFetching) {
        return (
            <Screen>
                <LoadingModal />
            </Screen>
        );
    }

    if (isError) {
        return <Screen>Error</Screen>;
    }

    if (isSuccess) {
        const renderSurveyListItem = (jobInfo) => {
            return <SurveyCareerListItem jobInfo={jobInfo} />;
        };

        const { holland6SuggestedJobs, mbtiSuggestedJobs } = data;

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
                        <h2 className="text-2xl font-bold tracking-tight pt-5">Holland 6 suggested jobs</h2>
                        {holland6SuggestedJobs.map((jobInfo) => renderSurveyListItem(jobInfo))}

                        <h2 className="text-2xl font-bold tracking-tight">MBTI suggested jobs:</h2>
                        {mbtiSuggestedJobs.map((jobInfo) => renderSurveyListItem(jobInfo))}
                    </div>
                </div>
            </Screen>
        );
    }
}
