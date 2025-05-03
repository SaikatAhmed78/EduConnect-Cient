import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import useAuth from "../Hooks/useAuth";
import { FaUserGraduate, FaStar, FaBookOpen } from "react-icons/fa";

const TutorDashboard = () => {
    const { user: authuser } = useAuth();
    const [user] = useState({
        phone: "123-456-7890",
        address: "123 Main St, City, Country",
        image: "https://img.freepik.com/free-photo/view-3d-businessman_23-2150709998.jpg?ga=GA1.1.131701495.1740392067&semt=ais_hybrid"
    });

    const data = [
        { name: "January", students: 30 },
        { name: "February", students: 45 },
        { name: "March", students: 25 },
        { name: "April", students: 50 }
    ];

    return (
        <div className="p-6 space-y-6">
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto text-center">
                <img src={user.image} alt="Profile" className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{authuser.displayName}</h2>
                <p className="text-gray-600 dark:text-gray-400">{authuser.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{user.phone}</p>
                <p className="text-gray-600 dark:text-gray-400">{user.address}</p>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <FaUserGraduate className="text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Total Students</h3>
                        <p className="text-xl font-bold">200+</p>
                    </div>
                </div>
                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <FaStar className="text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Average Rating</h3>
                        <p className="text-xl font-bold">4.8/5</p>
                    </div>
                </div>
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
                    <FaBookOpen className="text-4xl" />
                    <div>
                        <h3 className="text-lg font-semibold">Courses Completed</h3>
                        <p className="text-xl font-bold">50+</p>
                    </div>
                </div>
            </div>

           
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Student Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="students" fill="#4A90E2" radius={[5, 5, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TutorDashboard;
