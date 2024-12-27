import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUserDetails } from '@/modules/profile/domain/useCase/useUserDetails';
import { theVarkResult } from '@/modules/theVark/data/entity/theVarkResult';
import { ErrorModal } from '@/platform/customComponents/error/ErrorModal';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'lottie-react';
import { useComprehensiveReport } from '../../domain/useCase/useComprehensiveReport';
import { surveyAsset } from '../asset';
import { SurveyAllCompletedPDF } from '../component/SurveyAllCompletedPDF';
import { SurveyCareerListItem } from '../component/SurveyCareerListItem';
import { SurveyLearningListItem } from '../component/SurveyLearningListItem';

export function SurveyAllCompletedScreen() {
    const { data, isError, isSuccess, isFetching } = useComprehensiveReport();
    const { data: userDetails } = useUserDetails();

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

                    <div className="grid grid-cols-10 gap-1">
                        <div className="col-span-7 px-2 max-w-6xl">
                            <ScrollArea className="h-[70vh] w-full ">
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
                                        <h2 className="text-2xl font-semibold border-b border-primary pb-3">
                                            MBTI Suggested Jobs
                                        </h2>
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
                        </div>

                        <div className="col-span-3 flex flex-col gap-y-4 px-10 py-10 justify-center items-center text-center rounded-lg">
                            <Lottie
                                animationData={surveyAsset.Unlock}
                                style={{ width: '100%', height: '100%' }}
                            />
                            <div className="text-lg font-semibold">
                                Congratulaion on completed the surveys. You can now download your comprehensive report.
                            </div>
                            <PDFDownloadLink
                                document={
                                    <SurveyAllCompletedPDF
                                        holland6SuggestedJobs={holland6SuggestedJobs}
                                        mbtiSuggestedJobs={mbtiSuggestedJobs}
                                        TheVarkResult={theVarkInfo}
                                        userName={userDetails.name}
                                    />
                                }
                                fileName={`${userDetails.name.replace(/\s+/g, '_')}_ComprehensiveReport.pdf`}
                                className="ml-3"
                            >
                                {({ loading }) => (loading ? 'Loading document...' : <Button>Download PDF</Button>)}
                            </PDFDownloadLink>
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}
