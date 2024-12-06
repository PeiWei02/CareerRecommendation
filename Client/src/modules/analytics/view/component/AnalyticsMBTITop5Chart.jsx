import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';
import { transformFillColourField } from '../../domain/utils/transformFillColourField';

export function AnalyticsMBTITop5Chart({ chartData }) {
    const transformData = transformFillColourField(chartData);

    const chartConfig = transformData.reduce((acc, item) => {
        acc[item._id] = {
            label: item._id,
            color: item.fill,
        };
        return acc;
    }, {});

    const highestType = transformData.reduce((max, item) => (item.count > max.count ? item : max), {
        _id: null,
        count: 0,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 5 MBTI Personality Types</CardTitle>
                <CardDescription>Rank of Top 5 MBTI personality types</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={transformData}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="_id"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => chartConfig[value].label}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="count"
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                );
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Highest Type: {highestType._id} with {highestType.count} responses.
                </div>
                <div className="leading-none text-muted-foreground">Showing Top 5 MBTI personality types</div>
            </CardFooter>
        </Card>
    );
}

AnalyticsMBTITop5Chart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            fillColour: PropTypes.string,
        }),
    ).isRequired,
};
