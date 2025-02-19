import React from 'react';
import { FaUserCircle, FaBookOpen, FaClipboardList, FaCalendarCheck, FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const progressData = [
  { name: 'Math', progress: 70 },
  { name: 'Science', progress: 85 },
  { name: 'History', progress: 55 },
  { name: 'English', progress: 90 },
];

const StudentDashboardDA = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 min-h-screen ml-10">
      {/* Page Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">Student Dashboard</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Welcome to your learning space. Stay on track and grow your skills.</p>
      </header>

      {/* Student Profile Section */}
      <section className="flex items-center space-x-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-full p-4">
          <FaUserCircle className="text-indigo-500 w-24 h-24" />
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Student Profile</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Name: Jane Doe</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Email: jane.doe@example.com</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Roll No: 12345</p>
          <p className="text-lg text-gray-600 dark:text-gray-400">Class: 10th Grade</p>
        </div>
      </section>

      {/* Progress Bar Section */}
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

      {/* Upcoming Classes/Assignments Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-green-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaCalendarCheck className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Upcoming Classes</h3>
          <p className="mt-4 text-lg text-white">Mathematics - 10 AM</p>
          <p className="text-lg text-white">Science - 2 PM</p>
        </div>
        <div className="bg-blue-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaClipboardList className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Pending Assignments</h3>
          <p className="mt-4 text-lg text-white">History Essay</p>
          <p className="text-lg text-white">Science Experiment</p>
        </div>
        <div className="bg-purple-600 text-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <FaGraduationCap className="text-white w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold">Upcoming Exams</h3>
          <p className="mt-4 text-lg text-white">Math Exam - 20th Feb</p>
          <p className="text-lg text-white">English Exam - 25th Feb</p>
        </div>
      </section>

      {/* Activity Feed Section */}
      <section className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Activity Feed</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <FaTrophy className="text-yellow-500 w-8 h-8" />
            <div>
              <p className="text-lg text-gray-800 dark:text-white font-semibold">Awarded Top Performer in Math</p>
              <span className="text-sm text-gray-500 dark:text-gray-300">2 days ago</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaTrophy className="text-yellow-500 w-8 h-8" />
            <div>
              <p className="text-lg text-gray-800 dark:text-white font-semibold">Completed Science Lab Experiment</p>
              <span className="text-sm text-gray-500 dark:text-gray-300">3 days ago</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FaTrophy className="text-yellow-500 w-8 h-8" />
            <div>
              <p className="text-lg text-gray-800 dark:text-white font-semibold">Achieved 90% in History Test</p>
              <span className="text-sm text-gray-500 dark:text-gray-300">1 week ago</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Scores Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Mathematics</h3>
          <p className="text-lg text-gray-800 dark:text-white">Score: 85%</p>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Science</h3>
          <p className="text-lg text-gray-800 dark:text-white">Score: 92%</p>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">History</h3>
          <p className="text-lg text-gray-800 dark:text-white">Score: 78%</p>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboardDA;
