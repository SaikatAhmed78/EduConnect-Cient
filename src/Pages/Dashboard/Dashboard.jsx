
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaPlus, FaEdit, FaCalendarAlt, FaUsers, FaUserShield, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import useAdminRole from '../../Hooks/useAdminRole';
import useTutorRole from '../../Hooks/useTutorRole';

const tutorMenuItems = [
    { to: "/", label: "Home", icon: <FaHome />, end: true },
    { to: "/dashboard/create-study-session", label: "Create Study Session", icon: <FaPlus /> },
    { to: "/dashboard/view-all-study-session", label: "View All Study Sessions", icon: <FaEdit /> },
    { to: "/dashboard/upload-materials", label: "Upload Materials", icon: <FaCalendarAlt /> },
    { to: "/dashboard/view-all-materials", label: "View All Materials", icon: <FaUsers /> },
];

const studentMenuItems = [
    { to: "/dashboard/studentDS", label: "User Home", icon: <FaHome />, end: true },
    { to: "/dashboard/view-booked-session", label: "View Booked Sessions", icon: <FaCalendarAlt /> },
    { to: "/dashboard/create-note", label: "Create Note", icon: <FaPlus /> },
    { to: "/dashboard/manage-notes", label: "Manage Personal Notes", icon: <FaEdit /> },
    { to: "/dashboard/view-study-meterials", label: "View Study Materials", icon: <FaCalendarAlt /> },
];

const adminMenuItems = [
    { to: "/dashboard/adminDa", label: "Admin Dashboard", icon: <FaHome />, end: true },
    { to: "/dashboard/view-all-users", label: "View All Users", icon: <FaUserShield /> },
    { to: "/dashboard/view-all-study-sessionA", label: "View All Sessions", icon: <FaEdit /> },
    { to: "/dashboard/view-all-materialsA", label: "View All Materials", icon: <FaCalendarAlt /> },
];

const Dashboard = () => {
    const [isAdmin] = useAdminRole();
    const [isTutor] = useTutorRole();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    let menuItems = studentMenuItems;
    if (isAdmin) {
        menuItems = adminMenuItems;
    } else if (isTutor) {
        menuItems = tutorMenuItems;
    }

    return (
        <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
           
            <aside className={`fixed ${isSidebarOpen ? 'w-64' : 'w-20'} h-screen bg-gradient-to-b from-blue-500 to-indigo-600 shadow-lg p-4 transition-all duration-300`}>
                <div className="flex items-center justify-between mb-8">
                    <h2 className={`text-3xl font-extrabold text-white ${!isSidebarOpen && 'hidden'}`}>EduConnect</h2>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        <FaBars className="text-white w-6 h-6" />
                    </button>
                </div>

                <ul className="space-y-4">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-indigo-600 shadow" : "text-white hover:bg-indigo-700 hover:bg-opacity-50"}`
                                }
                            >
                                {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                                {isSidebarOpen && <span>{item.label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                    <div className='divider'></div>

                    <div className='gap-3'>
                    <NavLink to="/" className={({ isActive }) =>
                                    `flex items-center space-x-2 p-2 rounded-md transition-all duration-300 ${isActive ? "bg-white text-indigo-600 shadow" : "text-white hover:bg-indigo-700 hover:bg-opacity-50"}`}>
                                      <FaHome></FaHome> Home

                    </NavLink>
                    </div>
                <div className="absolute bottom-4 left-4">
                    <button onClick={() => setIsDarkMode(!isDarkMode)} className="flex items-center space-x-2 p-2 rounded-md bg-indigo-700 text-white">
                        {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
                        {isSidebarOpen && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
                    </button>
                </div>
            </aside>

            
            <main className={`ml-${isSidebarOpen ? '64' : '20'} flex-1 p-10 bg-white shadow-inner rounded-lg overflow-y-auto transition-all duration-300`}>
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
