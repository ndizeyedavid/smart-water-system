import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function UsageChart({ usage }) {

    // console.log(usage)

    const usageData = usage.map(({ created, litre }) => {

        const date = new Date(created);

        return {
            time: date.toLocaleTimeString(),
            usage: litre
        }
    });

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
                <YAxis />
                <Tooltip />
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
