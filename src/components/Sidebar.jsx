import { Home, BarChart2, Settings, AlertTriangle, LogOut } from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import isLoggedIn from "../utils/sessionVerifier"
import pb from '../utils/pocketbase';

export default function Sidebar() {
    const navigate = useNavigate();

    isLoggedIn()


    const menuItems = [
        { id: 'overview', label: 'Overview', path: "/dashboard", icon: <Home className="w-5 h-5" /> },
        { id: 'analytics', label: 'Analytics', path: "/analytics", icon: <BarChart2 className="w-5 h-5" /> },
        { id: 'alerts', label: 'Alerts', path: "/alerts", icon: <AlertTriangle className="w-5 h-5" /> },
        // { id: 'settings', label: 'Profile', path: "/profile", icon: <Settings className="w-5 h-5" /> },
    ];

    function handleLogout() {
        if (confirm("Are you sure you want to logout?")) {
            pb.authStore.clear();
            navigate("/")
        }
    }

    return (
        <>
            {/* Sidebar */}
            <div div className="w-64 bg-white shadow-lg" >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-20 border-b">
                        <h1 className="text-2xl font-bold text-blue-600">Smart Water</h1>
                    </div>
                    <nav className="flex-1 p-4 space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.path}
                                className="flex items-center w-full px-4 py-3 text-left text-gray-600 rounded-lg hover:bg-gray-50"
                            >
                                {item.icon}
                                <span className="ml-3">{item.label}</span>
                            </NavLink>
                        ))}
                    </nav>
                    <div className="p-4 border-t">
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-3 text-left text-gray-600 rounded-lg hover:bg-gray-50">
                            <LogOut className="w-5 h-5" />
                            <span className="ml-3">Logout</span>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
