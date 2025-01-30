import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import useAxiosUser from '../../Hooks/useAxiosUser';

const ViewStudyMaterials = () => {
  const [selectedSession, setSelectedSession] = useState('');
  const axiosUser = useAxiosUser();

  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['bookedSessions'],
    queryFn: async () => {
      const res = await axiosUser.get('/booked-sessions');
      return res.data;
    },
  });
  
  const { data: materials, isLoading: materialsLoading, refetch: fetchMaterials } = useQuery({
    queryKey: ['materials', selectedSession],
    queryFn: async () => {
      const res = await axiosUser.get(`/materials/${selectedSession}`);
      return res.data;
    },
    enabled: !!selectedSession, 
  });
  

  const handleSessionChange = (e) => {
    const sessionId = e.target.value;
    setSelectedSession(sessionId);
    if (sessionId) fetchMaterials();
  };

  return (
    <div className="flex flex-col items-center mt-12 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Study Materials</h1>
      <p className="text-gray-600 mb-8 text-center max-w-3xl">
        Browse study materials for your booked sessions. Select a session to view the associated materials.
      </p>

      {/* Session Selector */}
      <div className="w-full max-w-lg mb-6">
        <select
          onChange={handleSessionChange}
          value={selectedSession}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a session</option>
          {sessionsLoading ? (
            <option>Loading sessions...</option>
          ) : (
            sessions?.map((session) => (
              <option key={session._id} value={session._id}>
                {session.title}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {materialsLoading && selectedSession ? (
          <div className="text-center col-span-full">Loading materials...</div>
        ) : materials?.length > 0 ? (
          materials.map((material) => (
            <div
              key={material._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <img
                src={material.image}
                alt={material.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {material.title}
              </h2>
              <div className="flex justify-between items-center mt-4">
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                  <FaExternalLinkAlt className="mr-2" /> Access Material
                </a>
                <a
                  href={material.image}
                  download
                  className="text-green-500 hover:text-green-700 flex items-center"
                >
                  <FaDownload className="mr-2" /> Download Image
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600 col-span-full">No materials found for this session.</div>
        )}
      </div>
    </div>
  );
};

export default ViewStudyMaterials;
