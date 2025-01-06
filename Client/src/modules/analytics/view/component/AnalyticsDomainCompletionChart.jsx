import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp } from 'lucide-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';
import { transformFillColourField } from '../../domain/utils/transformFillColourField';

const chartConfig = {
    vark: {
        label: 'The Vark',
    },
    mbti: {
        label: 'MBTI',
    },
    holland6: {
        label: 'Holland 6',
    },
};

export function AnalyticsDomainCompletionChart({ chartData }) {
    const totalVisitors = useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.count, 0);
    }, [chartData]);

    const highestTest = useMemo(() => {
        if (!chartData || chartData.length === 0) return { test: null, count: 0 };
        return chartData.reduce((max, curr) => (curr.count > max.count ? curr : max));
    }, [chartData]);

    const { test: highestTestType, count: highestNumber } = highestTest;
    const transformData = transformFillColourField(chartData);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Survey Completion Distribution</CardTitle>
                <CardDescription>Response data of different domain tests</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={transformData}
                            dataKey="count"
                            nameKey="test"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Attempt
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                {highestTest.test && (
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Highest completed domain: {highestTestType} ({highestNumber})
                        <TrendingUp className="h-4 w-4" />
                    </div>
                )}
                <div className="leading-none text-muted-foreground">Displaying overview survey completion rates</div>
            </CardFooter>
        </Card>
    );
}

AnalyticsDomainCompletionChart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            test: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        }),
    ).isRequired,
};
