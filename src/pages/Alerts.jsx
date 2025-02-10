import { AlertTriangle } from "lucide-react";
import MainContainer from "../components/MainContainer";
import Sidebar from "../components/Sidebar";
import Alert from "../components/Alert";
import { useEffect, useState } from "react";
import pb from "../utils/pocketbase";

export default function Alerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        async function fetch_alerts() {
            const fetched_alerts = await pb.collection("leakages").getFullList();

            setAlerts(fetched_alerts);
        }

        fetch_alerts();
    })

    return (
        <>
            <div className="flex h-screen bg-gray-100">
                <Sidebar />

                {/* Main Content */}
                <MainContainer>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Alerts & Notifications</h2>
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6">
                                <div className="space-y-4">
                                    {/* Sample alerts */}

                                    {alerts.map((data, index) => (
                                        <Alert key={index} date={data.created} level={data.level} />
                                    ))}


                                </div>
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </div>
        </>
    )
}
