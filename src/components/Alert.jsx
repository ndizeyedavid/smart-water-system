import { AlertTriangle } from "lucide-react";

export default function Alert({ level, date }) {

    const dt = new Date(date)

    return (
        <div className="p-4 rounded-lg bg-yellow-50">
            <div className="flex items-center">
                <AlertTriangle className={`w-5 h-5 ${level == "Medium" ? "text-yellow-500" : "text-red-500"}`} />
                <h3 className={`ml-2 font-semibold ${level == "Medium" ? "text-yellow-700" : "text-red-700"}`}>{level} Usage Warning</h3>
            </div>
            <p className={`mt-2 text-sm ${level == "Medium" ? "text-yellow-600" : "text-red-600"}`}>
                Water usage is {level === "High" ? "75" : "20"}% higher than usual for this time of day.
            </p>

            <span className="text-gray-600 float-end">{dt.toDateString() + " - " + dt.toLocaleTimeString()}</span>
        </div>
    )
}
