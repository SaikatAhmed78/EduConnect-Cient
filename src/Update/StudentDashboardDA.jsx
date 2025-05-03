import React from 'react';
import { FaUserCircle, FaBookOpen, FaClipboardList, FaCalendarCheck, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuth from '../Hooks/useAuth';

const progressData = [
  { name: 'Math', progress: 70 },
  { name: 'Science', progress: 85 },
  { name: 'History', progress: 55 },
  { name: 'English', progress: 90 },
];

const StudentDashboardDA = () => {

   const { user} = useAuth();
  return (
    <div className="p-6 min-h-screen ml-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">Student Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Welcome to your learning space. Stay on track and grow your skills.</p>
      </header>

      <section className="flex items-center space-x-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-4">
          <FaUserCircle className="text-indigo-500 w-24 h-24" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Student Profile</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Name: {user.displayName}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Email: {user.email}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Roll No: 12345</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Class: 10th Grade</p>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Learning Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progressData.map((subject) => (
            <div key={subject.name} className="flex items-center justify-between mb-4">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{subject.name}</div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 h-2 rounded-full">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${subject.progress}%` }}></div>
              </div>
              <span className="ml-4 text-lg font-semibold text-gray-800 dark:text-white">{subject.progress}%</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Performance Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="progress" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

    </div>
  );
};

export default StudentDashboardDA;
