import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';

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
        <div className="w-11/12 mx-auto mt-12 px-6">
            <h1 className="text-4xl font-bold text-center text-cyan-600 mb-12">
                Upcoming Study Sessions
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedSessions.map(({ _id, title, description, startDate, image, registrationStartDate, registrationEndDate }) => {
                    const today = dayjs();
                    let status = '';
                    let statusColor = '';

                    if (today.isAfter(registrationEndDate)) {
                        status = 'Closed';
                        statusColor = 'bg-red-500';
                    } else if (today.isBefore(registrationStartDate)) {
                        status = 'Upcoming';
                        statusColor = 'bg-green-500';
                    } else {
                        status = 'Ongoing';
                        statusColor = 'bg-cyan-500';
                    }

                    return (
                        <div
                            key={_id}
                            className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 hover:text-cyan-600 transition-colors duration-200">
                                    {title}
                                </h3>
                                <p className="text-gray-500 mt-2 mb-4 text-lg">{description}</p>

                                <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColor}`}>{status}</span>

                                <Link to={`dashboard/session-details-card/${_id}`}>
                                    <button className="w-full py-2 px-4 mt-3 border border-blue-500 text-blue-500 hover:bg-blue-100 transition-all rounded-md">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>


            <div className="text-center mt-10">
                <Link to="/all-sessionP">
                    <button className="relative inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg shadow-md hover:shadow-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 ease-in-out">
                        <span className="mr-2">See All Sessions</span>
                        <svg className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </button>
                </Link>
            </div>


        </div>
    );
};

export default StudySessions;
