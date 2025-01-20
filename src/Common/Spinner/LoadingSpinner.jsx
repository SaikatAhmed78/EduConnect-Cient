import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black bg-opacity-60">
            <div className="w-16 h-16 border-8 border-t-8 border-solid border-gray-200 border-t-pink-400 rounded-full animate-spin ring-4 ring-pink-600"></div>
            <p className="text-white mt-4 text-2xl font-bold animate-pulse">Loading... Please Wait...</p>
        </div>
    );
};

export default LoadingSpinner;
