import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaCalendarAlt, FaUsers } from 'react-icons/fa';

const tutorMenuItems = [
    { to: "/", label: "Home", icon: <FaHome />, end: true },
    { to: "/dashboard/create-study-session", label: "Create-study-session", icon: <FaPlus /> },
    { to: "/dashboard/view-all-study-session", label: "View-all-study-sessions", icon: <FaEdit /> },
    { to: "/dashboard/upload-materials", label: "Upload-materials", icon: <FaCalendarAlt /> },
    { to: "/dashboard/view-all-materials", label: "View-all-materials", icon: <FaUsers /> },
];



const studentMenuItems = [
    { to: "/", label: "User Home", icon: <FaHome />, end: true },
    { to: "/dashboard/view-booked-session", label: "View Booked Sessions", icon: <FaCalendarAlt /> },
    { to: "/dashboard/create-note", label: "Create Note", icon: <FaPlus /> },
    { to: "/dashboard/manage-notes", label: "Manage Personal Notes", icon: <FaEdit /> },
    { to: "/dashboard/view-study-meterials", label: "View Study Materials", icon: <FaCalendarAlt /> },
];

const Dashboard = () => {
    const istutor = true;

    return (
        <div className="flex h-screen bg-gradient-to-tr from-gray-100 to-gray-300">
            <aside className="fixed w-64 h-screen bg-gradient-to-b from-blue-500 to-indigo-600 shadow-lg p-6">
                <h2 className="text-3xl font-extrabold text-white mb-8 text-center">EduConnect Dashboard</h2>
                <ul className="space-y-4">
                    {(istutor ? tutorMenuItems : studentMenuItems).map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-indigo-600 shadow" : "text-white hover:bg-indigo-700 hover:bg-opacity-50"
                                    }`
                                }
                            >
                                {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </aside>
            <main className="ml-64 flex-1 p-10 bg-white shadow-inner rounded-lg overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
