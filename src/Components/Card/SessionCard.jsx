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
            const res = await axiosUser.get('/sessions?page=1&limit=6');
            return res.data;
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p className="text-red-500 text-center">Error: {error.message}</p>;

    const approvedSessions = sessions.filter(session => session.status === 'approved');

    return (
        <div className="w-11/12 mx-auto mt-12 px-6">
            <h1 className="text-4xl font-bold text-center text-cyan-600 mb-12">
                Upcoming Study Sessions
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedSessions.map(({ _id, title, description, startDate, endDate, image, registrationStartDate, registrationEndDate }) => {
                    const today = dayjs();
                    let status = '';
                    let isDisabled = false;

                    if (today.isAfter(registrationEndDate)) {
                        status = 'Closed';
                        isDisabled = true;
                    } else if (today.isBefore(registrationStartDate)) {
                        status = 'Upcoming';
                    } else {
                        status = 'Ongoing';
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

                                <button 
                                    className={`w-full py-2 px-4 rounded-md mt-3 transition-all ${status === 'Ongoing' ? 'bg-cyan-500 text-white' : status === 'Upcoming' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
                                    disabled={isDisabled}
                                >
                                    {status}
                                </button>
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
                <button
            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-primary transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
                  <span
                      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="#3B9DF8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>

                  <span
                      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>

                  <span
                      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white"> See All Sessions</span>
        </button>
                </Link>
            </div>
        </div>
    );
};

export default StudySessions;
