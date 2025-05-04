import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import useAxiosUser from '../Hooks/useAxiosUser';

const TrendingSessions = () => {
  const axiosUser = useAxiosUser();

  const { data: sessions = [], isLoading, isError } = useQuery({
    queryKey: ['trendingSessions'],
    queryFn: async () => {
      const res = await axiosUser.get('/trendingSessions');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center py-10 text-cyan-500">Loading trending sessions...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load trending sessions.</div>;

  return (
    <div className="w-11/12 mx-auto mt-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-cyan-500 flex items-center justify-center gap-2">
        <Flame className="text-red-500 animate-pulse" /> Trending Sessions
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 md:px-10">
        {sessions.map(session => (
          <div key={session._id} className="bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
            <img src={session.image} alt={session.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{session.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{session.description.slice(0, 90)}...</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-green-600 font-bold">৳{session.registrationFee}</span>
                <Link to={`/session-details-card/${session._id}`}>
                  <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1.5 rounded-full text-sm hover:scale-105 transition-transform">View</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSessions;
