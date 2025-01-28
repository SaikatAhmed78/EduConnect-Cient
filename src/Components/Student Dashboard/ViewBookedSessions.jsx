import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';

const ViewBookedSessions = () => {
  const axiosUser = useAxiosUser();

  const { data: sessions = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['bookedSessions'],
    queryFn: async () => {
      const response = await axiosUser.get('/booked-sessions');
      return response.data;
    },
    enabled: false,  
  });

  const handleRefetch = () => {
    refetch();  
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-6 text-white">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-white">Your Booked Sessions</h2>
          <button
            onClick={handleRefetch}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
          >
            Refresh
          </button>
        </div>

        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold text-blue-500">{session.title}</h3>
                <p className="text-sm text-gray-400 mt-2">Date: {session.date}</p>
                <p className="mt-4 text-gray-300">{session.description}</p>
                <div className="mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-all duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No booked sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewBookedSessions;
