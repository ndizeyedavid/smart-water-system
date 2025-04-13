import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function UsageChart({ usage }) {
    // Group data by hour and calculate average
    const hourlyData = usage.reduce((acc, { created, litre }) => {
        const date = new Date(created);
        const hour = date.getHours();

        if (!acc[hour]) {
            acc[hour] = { total: 0, count: 0 };
        }

        acc[hour].total += litre;
        acc[hour].count += 1;

        return acc;
    }, {});

    // Convert to array and calculate averages
    const usageData = Object.entries(hourlyData).map(([hour, data]) => ({
        time: `${hour}:00`,
        usage: (data.total / data.count).toFixed(2),
    })).sort((a, b) => parseInt(a.time) - parseInt(b.time));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={usageData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 20,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis tickFormatter={(value) => `${value} L`} />
                <Tooltip formatter={(value) => [`${value} L`, 'Usage']} />
                <Line
                    type="monotone"
                    dataKey="usage"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 2 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
