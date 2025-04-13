
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Prediction({ usage }) {
    // Prepare data for linear regression
    const data = usage.map((point, index) => ({
        day: `Day ${index + 1}`,
        litre: point.litre
    }));

    const n = data.length;
    const sumX = data.reduce((acc, point, index) => acc + (index + 1), 0);
    const sumY = data.reduce((acc, point) => acc + point.litre, 0);
    const sumXY = data.reduce((acc, point, index) => acc + ((index + 1) * point.litre), 0);
    const sumXX = data.reduce((acc, point, index) => acc + ((index + 1) * (index + 1)), 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const futureData = data.map((point, index) => ({
        day: point.day,
        litre: point.litre,
        prediction: (slope * (index + 1) + intercept).toFixed(2)
    }));

    for (let i = n + 1; i <= n + 3; i++) {
        futureData.push({
            day: `Day ${i}`,
            prediction: (slope * i + intercept).toFixed(2)
        });
    }

    const trend = slope > 0 ? "increasing" : "decreasing";

    return (
        <div className="space-y-4 w-full">
            <h2 className="text-xl font-semibold">Water Usage Prediction</h2>
            <p className="text-gray-600">
                Trend: {trend} by {Math.abs(slope).toFixed(1)} L/day
            </p>
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={futureData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis tickFormatter={(value) => `${value} L`} />
                        <Tooltip formatter={(value) => [`${value} L`, 'Usage']} />
                        <Legend />
                        <Line type="monotone" dataKey="litre" stroke="#2563eb" name="Actual Usage" strokeWidth={2} dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="prediction" stroke="#16a34a" name="Predicted" strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
