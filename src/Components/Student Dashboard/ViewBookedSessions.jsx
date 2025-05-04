import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react'; 

const ViewBookedSessions = () => {
  const axiosUser = useAxiosUser();

  const { data: sessions = [], isLoading, isError, error } = useQuery({
    queryKey: ['bookedSessions'],
    queryFn: async () => {
      const res = await axiosUser.get('/postData');
      return res.data;
    }
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-6 text-red-500 font-medium">Error: {error.message}</div>;

  return (
    <div className="px-4 md:px-10 py-8 min-h-screen  text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 drop-shadow-sm tracking-tight">
            📅 Your Booked Sessions
          </h2>
          <p className="text-gray-400 mt-2 text-sm">Here’s a list of sessions you’ve secured!</p>
        </div>

        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-white/10 backdrop-blur-sm border border-white/10 p-6 rounded-2xl shadow-xl transition hover:shadow-2xl hover:-translate-y-1 duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                
                  <span className="text-xs text-gray-300 italic">#{session._id.slice(-4)}</span>
                </div>

                <h3 className="text-xl font-bold text-cyan-300 mb-2 line-clamp-1">{session.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{session.description}</p>

                <Link to={`/dashboard/session/${session._id}`}>
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-blue-600 hover:to-cyan-500 text-white py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl">
                    <Eye size={18} /> View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10">No booked sessions found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewBookedSessions;
