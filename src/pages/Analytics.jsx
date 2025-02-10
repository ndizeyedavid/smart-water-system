import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import MainContainer from "../components/MainContainer";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from 'react';
import pb from '../utils/pocketbase';


// const usagePatterns = [
//     { time: '6am', usage: 30 },
//     { time: '9am', usage: 45 },
//     { time: '12pm', usage: 60 },
//     { time: '3pm', usage: 40 },
//     { time: '6pm', usage: 65 },
//     { time: '9pm', usage: 35 },
// ];

function Analytics() {

    const [monthlyUsage, setMonthlyUsage] = useState([]);
    const [currentUsagePatterns, setCurrentUsagePatterns] = useState([]);
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        async function fetch_analytics() {
            const fetch_monthly_consumption = await pb.collection("consumption").getFullList();
            const fetch_usage_patterns = await pb.collection("consumption").getList(1, 3);
            const fetch_history = await pb.collection("history").getFullList();

            setMonthlyUsage(fetch_monthly_consumption);
            setCurrentUsagePatterns(fetch_usage_patterns.items);
            setHistoryData(fetch_history);


        }
        fetch_analytics();
    }, [])

    const monthlyData = monthlyUsage.map(({ created, litre }) => {
        const date = new Date(created);
        return {
            month: date.toLocaleTimeString(),
            usage: litre
        }
    });

    const usagePatterns = currentUsagePatterns.map(({ created, litre }) => {
        const date = new Date(created);
        return {
            time: date.getSeconds(),
            usage: litre
        }
    })


    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />
                <MainContainer>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Water Usage Analytics</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h3 className="mb-4 text-lg font-semibold">Whole Consumption</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={monthlyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="month" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="usage"
                                                stroke="#2563eb"
                                                name="Water Usage (L)"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="p-6 bg-white rounded-lg shadow">
                                <h3 className="mb-4 text-lg font-semibold">Usage Patterns</h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={usagePatterns}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="time" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="usage"
                                                fill="#2563eb"
                                                name="Water Usage (L)"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-white rounded-lg shadow">
                            <h3 className="mb-4 text-lg font-semibold">Water consumption history</h3>
                            <div className="overflow-auto">
                                <table className='w-full h-full'>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Details</th>
                                            <th>Priority</th>
                                            <th>Occurance Date</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {historyData.map((data, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className='text-start'>{data.details}</td>
                                                <td>{data.priority}</td>
                                                <td>
                                                    {
                                                        new Date(data.created).toUTCString().replace("GMT", "")
                                                    }
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>

                                </table>
                            </div>
                        </div>

                    </div>
                </MainContainer>
            </div>
        </>
    )
}

export default Analytics;
