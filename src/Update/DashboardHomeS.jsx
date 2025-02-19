import React from 'react';
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaCalendarCheck,
  FaLightbulb,
} from 'react-icons/fa';

const DashboardHomeS = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Page Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
          Welcome to EduConnect Dashboard
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Stay organized, stay ahead.
        </p>
      </header>

      {/* Key Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaUserGraduate className="text-blue-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Total Students
            </h2>
            <p className="text-2xl font-bold">1,245</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaChalkboardTeacher className="text-indigo-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Total Tutors
            </h2>
            <p className="text-2xl font-bold">320</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaBookOpen className="text-green-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Study Materials
            </h2>
            <p className="text-2xl font-bold">3,658</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6 flex items-center">
          <FaCalendarCheck className="text-purple-500 w-10 h-10 mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Upcoming Sessions
            </h2>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-2xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold">Important Announcements</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li>
            <strong>New Study Material Upload:</strong> Chapter 5 notes have been uploaded.
          </li>
          <li>
            <strong>Holiday Notice:</strong> Campus will be closed on 25th Dec for holidays.
          </li>
          <li>
            <strong>Feedback Reminder:</strong> Submit your feedback for the last session.
          </li>
        </ul>
      </section>

      {/* Upcoming Sessions */}
      <section className="bg-white dark:bg-gray-700 shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
          Upcoming Sessions
        </h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Algebra Basics - Math
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                10:00 AM, 20th Feb
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
              Join Now
            </button>
          </div>

          <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                Physics: Laws of Motion
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                12:00 PM, 21st Feb
              </p>
            </div>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600">
              Join Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHomeS;
