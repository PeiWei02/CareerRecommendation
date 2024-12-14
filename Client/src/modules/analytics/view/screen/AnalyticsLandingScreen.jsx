import { ErrorModal } from '@/platform/customComponents/error/ErrorModal';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useAnalyticsOverview } from '../../domain/useCase/useAnalyticsOverview';
import { AnalyticsDomainCompletionChart } from '../component/AnalyticsDomainCompletionChart';
import { AnalyticsHolland6Top5Chart } from '../component/AnalyticsHolland6Top5Chart';
import { AnalyticsMBTITop5Chart } from '../component/AnalyticsMBTITop5Chart';
import { AnalyticsTheVarkTop5Chart } from '../component/AnalyticsTheVarkTop5Chart';
import { AnalyticsUserGrowthChart } from '../component/AnalyticsUserGrowthChart';

export function AnalyticsLandingScreen() {
    const { data, isSuccess, isFetching, isError } = useAnalyticsOverview();

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

    if (isSuccess) {
        const { chartData, userChartData, holland6ChartData, varkChartData, mbtiChartData } = data;
        return (
            <Screen>
                <div className="flex flex-col space-y-4 p-8">
                    <div className="flex items-start justify-between space-y-2">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Dashboard and Statistics</h2>
                            <p className="text-muted-foreground">Here&apos;s an overview of user analytics</p>
                        </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-12 gap-2">
                        <div className="col-span-4 p-2 row-span-2">
                            <AnalyticsHolland6Top5Chart chartData={holland6ChartData} />
                        </div>
                        <div className="col-span-4 p-2 row-span-2">
                            <AnalyticsMBTITop5Chart chartData={mbtiChartData} />
                        </div>
                        <div className="col-span-4 p-2 row-span-2">
                            <AnalyticsTheVarkTop5Chart chartData={varkChartData} />
                        </div>
                        <div className="col-span-6 p-4 row-span-1">
                            <AnalyticsDomainCompletionChart chartData={chartData} />
                        </div>
                        <div className="col-span-6 p-4 row-span-1">
                            <AnalyticsUserGrowthChart chartData={userChartData} />
                        </div>
                    </div>
                </div>
            </Screen>
        );
    }
}
