import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            <div className="bg-white p-10 rounded-lg shadow-lg text-center">
                <h1 className="text-8xl font-extrabold text-gray-900">404</h1>
                <p className="mt-4 text-2xl font-semibold text-gray-600">Page Not Found</p>
                <p className="mt-2 text-gray-500">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="mt-6">
                    <button className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Go Home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
