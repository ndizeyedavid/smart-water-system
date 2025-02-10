import { Zap } from 'lucide-react'
import waterConsumptionTips from '../context/consumption'
import { useEffect, useState } from 'react'

export default function Recommendation() {

    const [selection, setSelection] = useState({});

    useEffect(() => {
        setSelection(waterConsumptionTips[Math.floor(Math.random() * waterConsumptionTips.length)]);

        // console.log(waterConsumptionTips[Math.floor(Math.random() * waterConsumptionTips.length)]);

    }, [])

    return (
        <div className="space-y-4">
            <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800">
                        {selection.title}
                    </h3>
                    <p className="text-gray-600">
                        {selection.text}
                    </p>
                </div>
            </div>
        </div>
    )
}
