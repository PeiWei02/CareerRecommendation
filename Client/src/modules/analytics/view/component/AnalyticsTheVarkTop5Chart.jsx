import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import PropTypes from 'prop-types';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { transformFillColourField } from '../../domain/utils/transformFillColourField';

const chartConfig = {
    V: {
        label: 'Visual',
    },
    A: {
        label: 'Aural',
    },
    R: {
        label: 'Reading',
    },
    K: {
        label: 'Kinesthetic',
    },
};

export function AnalyticsTheVarkTop5Chart({ chartData }) {
    const transformData = transformFillColourField(chartData);

    const highestType = transformData.reduce((max, item) => (item.count > max.count ? item : max), {
        _id: null,
        count: 0,
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Top 4 VARK Learning Styles</CardTitle>
                <CardDescription>Rank of top 5 VARK learning styles</CardDescription>
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
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Highest Type: {chartConfig[highestType._id]?.label || highestType._id} with {highestType.count}{' '}
                    responses
                </div>
                <div className="leading-none text-muted-foreground">Showing total VARK Learning Styles</div>
            </CardFooter>
        </Card>
    );
}

AnalyticsTheVarkTop5Chart.propTypes = {
    chartData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
            fillColour: PropTypes.string,
        }),
    ).isRequired,
};
