import React from 'react';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaCalendarCheck,
  FaUserCircle,
  FaSearch,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAuth from '../Hooks/useAuth';

const data = [
  { name: 'Jan', sessions: 12 },
  { name: 'Feb', sessions: 15 },
  { name: 'Mar', sessions: 18 },
  { name: 'Apr', sessions: 20 },
  { name: 'May', sessions: 25 },
];

const DashboardHomeS = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 min-h-screen ml-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-cyan-400">Admin Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Manage and overview your platform efficiently.
        </p>
      </header>

      <div className="mb-10 flex justify-center items-center">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            className="w-full p-4 pr-10 bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search for students, tutors, or materials..."
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500 dark:text-white" />
        </div>
      </div>

      <section className="flex flex-col items-center space-x-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-4">
          <FaUserCircle className="text-blue-500 w-24 h-24" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Admin Profile</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Name: {user?.displayName || 'John Doe'}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Email: {user?.email || 'admin@example.com'}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Phone: {user?.phone || '+1234567890'}</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Address: {user?.address || '123 Admin St., Admin City'}</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaUserGraduate className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Add New Student</h3>
          <Link to="/dashboard/view-all-users">
            <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-500">
              Add Student
            </button>
          </Link>
        </div>
        <div className="bg-green-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaChalkboardTeacher className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Add New Tutor</h3>
          <Link to="/dashboard/view-all-study-sessionA">
            <button className="mt-4 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-500">
              Add Tutor
            </button>
          </Link>
        </div>
        <div className="bg-blue-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaBookOpen className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Upload Study Material</h3>
          <Link to="/dashboard/view-all-materialsA">
            <button className="mt-4 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-500">
              Upload Material
            </button>
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaUserGraduate className="text-blue-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Students</h2>
            <p className="text-2xl font-bold">1,245</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaChalkboardTeacher className="text-indigo-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Total Tutors</h2>
            <p className="text-2xl font-bold">320</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaBookOpen className="text-green-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Study Materials</h2>
            <p className="text-2xl font-bold">3,658</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaCalendarCheck className="text-purple-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upcoming Sessions</h2>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Sessions Overview</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sessions" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default DashboardHomeS;
