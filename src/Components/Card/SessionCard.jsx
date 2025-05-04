import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';
import { Book, CalendarDays, Info } from 'lucide-react';

const StudySessions = () => {
    const axiosUser = useAxiosUser();

    const { data: sessions = [], isLoading, isError, error } = useQuery({
        queryKey: ['studySessions'],
        queryFn: async () => {
            const res = await axiosUser.get('/sessions');
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>;

    const approvedSessions = sessions.filter(session => session.status === 'approved').slice(0, 6);

    return (
        <div className="w-11/12 mx-auto mt-12 px-4">
            <h2 className="text-4xl font-bold text-center mb-10 text-cyan-500 flex items-center justify-center gap-2">
        <Book className="text-green-500 animate-pulse" />Upcoming Study Sessions
      </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {approvedSessions.map(({ _id, title, description, startDate, image, registrationStartDate, registrationEndDate }) => {
                    const today = new Date();
                    const start = new Date(startDate);
                    const regStart = new Date(registrationStartDate);
                    const regEnd = new Date(registrationEndDate);

                    let status = '';
                    let statusColor = '';

                    if (today > regEnd) {
                        status = 'Closed';
                        statusColor = 'bg-red-500';
                    } else if (today < regStart) {
                        status = 'Upcoming';
                        statusColor = 'bg-green-500';
                    } else {
                        status = 'Ongoing';
                        statusColor = 'bg-cyan-500';
                    }

                    // Format date as "DD MMM, YYYY"
                    const formattedDate = start.toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    });

                    return (
                        <div
                            key={_id}
                            className="relative group bg-gradient-to-br from-white to-slate-100 border rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md backdrop-blur-sm bg-black/40">
                                {formattedDate}
                            </div>

                            <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold shadow-md backdrop-blur-sm">
                                <span className={`${statusColor} px-2 py-1 rounded-full`}>{status}</span>
                            </div>

                            <div className="p-6 space-y-3">
                                <h3 className="text-2xl font-bold text-gray-800 hover:text-cyan-600 transition-colors">
                                    {title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                    {description}
                                </p>
                                <Link to={`/session-details-card/${_id}`}>
                                    <button className="flex items-center justify-center w-full mt-4 px-5 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 rounded-xl font-semibold shadow-md">
                                        <Info className="w-4 h-4 mr-2" /> Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="text-center mt-12">
                <Link to="/all-sessionP">
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl shadow-md hover:from-blue-600 hover:to-cyan-600 transition-transform hover:scale-105 duration-300">
                        <span className="mr-2">See All Sessions</span>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default StudySessions;
