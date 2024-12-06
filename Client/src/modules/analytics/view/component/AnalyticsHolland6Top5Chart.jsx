import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { transformFillColourField } from '../../domain/utils/transformFillColourField';

const chartConfig = {
    R: { label: 'Realistic' },
    I: { label: 'Investigative' },
    C: { label: 'Conventional' },
    S: { label: 'Social' },
};

export function AnalyticsHolland6Top5Chart({ chartData }) {
    const transformData = transformFillColourField(chartData);

    const highestType = transformData.reduce((max, item) => (item.count > max.count ? item : max), {
        _id: null,
        count: 0,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 5 Holland Personality Types</CardTitle>
                <CardDescription>Rank of Top 5 Holland personality types</CardDescription>
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
                            tickFormatter={(value) => chartConfig[value]?.label || value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="count"
                            strokeWidth={2}
                            radius={8}
                            fill={({ payload }) => chartConfig[payload._id]?.color || '#000'}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Highest Type: {chartConfig[highestType._id]?.label || highestType._id} with {highestType.count}{' '}
                    responses
                </div>
                <div className="leading-none text-muted-foreground">Showing Top 5 Holland personality types</div>
            </CardFooter>
        </Card>
    );
}

AnalyticsHolland6Top5Chart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            fillColour: PropTypes.string,
        }),
    ).isRequired,
};
