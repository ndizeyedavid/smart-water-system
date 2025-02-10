import { useState } from "react";
import MainContainer from "../components/MainContainer";
import Sidebar from "../components/Sidebar";
import { Bell, Lock, Upload, User, Mail } from "lucide-react";

export default function Profile() {
    const [avatar, setAvatar] = useState("/default-avatar.png");
    const [name, setName] = useState("John Doe");
    const [email, setEmail] = useState("john.doe@example.com");
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        sms: false,
    });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNotificationChange = (type) => {
        setNotifications((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <MainContainer>
                <div className="max-w-4xl p-6 mx-auto space-y-8">
                    {/* Profile Header */}
                    <div className="flex items-center space-x-6">
                        <div className="relative">
                            <img src={avatar} alt="Profile" className="object-cover w-24 h-24 border-2 border-blue-500 rounded-full" />
                            <label className="absolute bottom-0 right-0 p-2 transition bg-blue-500 rounded-full cursor-pointer hover:bg-blue-600">
                                <Upload className="text-white" />
                                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                            </label>
                        </div>
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="text-3xl font-bold text-gray-800 border-b-2 focus:outline-none"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-gray-600 border-b-2 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Notifications */}
                        <div className="p-6 bg-white shadow-md rounded-xl">
                            <div className="flex items-center mb-4 space-x-3">
                                <Bell className="text-blue-500" />
                                <h2 className="text-xl font-semibold">Notification Settings</h2>
                            </div>
                            <div className="space-y-4">
                                {["push", "email", "sms"].map((type) => (
                                    <label key={type} className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 text-blue-500 form-checkbox"
                                            checked={notifications[type]}
                                            onChange={() => handleNotificationChange(type)}
                                        />
                                        <span className="text-gray-700 capitalize">{type} Notifications</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Security */}
                        <div className="p-6 bg-white shadow-md rounded-xl">
                            <div className="flex items-center mb-4 space-x-3">
                                <Lock className="text-blue-500" />
                                <h2 className="text-xl font-semibold">Security Settings</h2>
                            </div>
                            <div className="space-y-4">
                                <input type="password" placeholder="Current Password" className="w-full px-4 py-2 text-left transition bg-gray-100 rounded-lg outline-blue-300 hover:bg-gray-200" />
                                <input type="password" placeholder="New Password" className="w-full px-4 py-2 text-left transition bg-gray-100 rounded-lg outline-blue-300 hover:bg-gray-200" />
                                <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 text-left transition bg-gray-100 rounded-lg outline-blue-300 hover:bg-gray-200" />
                                <button className="px-4 py-2 text-white transition bg-blue-600 rounded-lg x-4 hover:bg-blue-550 text-[17px]">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
        </div>
    );
}
