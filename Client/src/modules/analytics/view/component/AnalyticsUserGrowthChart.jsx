import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingDown, TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

const chartConfig = {
    month: {
        label: 'Month',
        color: 'hsl(var(--chart-1))',
    },
};

export function AnalyticsUserGrowthChart({ chartData }) {
    const growthInfo = useMemo(() => {
        if (chartData.length < 2) return null;

        const lastMonthData = chartData[chartData.length - 1];
        const secondLastMonthData = chartData[chartData.length - 2];

        const currentCount = lastMonthData.count;
        const previousCount = secondLastMonthData.count;

        if (previousCount === 0) return { percentage: null, growth: currentCount > 0, unchanged: currentCount === 0 };

        const percentageChange = ((currentCount - previousCount) / previousCount) * 100;

        return {
            percentage: Math.abs(percentageChange).toFixed(1),
            growth: percentageChange > 0,
            unchanged: percentageChange === 0,
            lastMonth: lastMonthData.month,
            secondLastMonth: secondLastMonthData.month,
        };
    }, [chartData]);

    const renderGrowthInfo = () => {
        if (!growthInfo) {
            return <div className="text-muted-foreground">Not enough data to calculate growth</div>;
        }

        const { growth, unchanged, percentage, lastMonth, secondLastMonth } = growthInfo;

        if (unchanged) {
            return (
                <div className="flex gap-2 font-medium leading-none">
                    No change compared to {secondLastMonth} ({lastMonth} remains unchanged)
                </div>
            );
        }

        return (
            <div className="flex gap-2 font-medium leading-none">
                {growth ? (
                    <>
                        Growth of {percentage}% from {secondLastMonth} to {lastMonth} <TrendingUp className="h-4 w-4" />
                    </>
                ) : (
                    <>
                        Decrease of {percentage}% from {secondLastMonth} to {lastMonth}
                        <TrendingDown className="h-4 w-4" />
                    </>
                )}
            </div>
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>User Growth Analysis</CardTitle>
                <CardDescription>Monthly user growth within a year</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    options={{ maintainAspectRatio: false }}
                    className="max-h-[250px] w-full"
                >
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="count"
                            fill="hsl(var(--chart-1))"
                            radius={8}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-center gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">{renderGrowthInfo()} </div>
                <div className="leading-none text-muted-foreground">Showing total user for the last 12 months</div>
            </CardFooter>
        </Card>
    );
}

AnalyticsUserGrowthChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            month: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        }),
    ).isRequired,
};
