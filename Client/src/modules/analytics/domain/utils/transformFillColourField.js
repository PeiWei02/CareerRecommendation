export function transformFillColourField(data) {
    return data.map((item, index) => ({
        ...item,
        fill: `hsl(var(--chart-${index + 1}))`,
    }));
}
