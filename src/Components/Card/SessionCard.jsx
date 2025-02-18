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

    // Filter only approved sessions
    const approvedSessions = sessions.filter(session => session.status === 'approved');

    return (
        <div className="container mx-auto mt-10 py-10">
            <h1 className="text-4xl font-semibold text-center mb-10">Upcoming Study Sessions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
                        <div key={_id} className="w-11/12 mx-auto sm:w-[80%] lg:w-[60%] shadow-md hover:shadow-none bg-white rounded-md relative group">
                            <img src={image} alt={title} className="w-full h-[200px] rounded-t-md object-cover" />
                            <div className="p-4 bg-white rounded-b-md">
                                <h3 className="text-2xl font-bold text-[#0FABCA]">{title}</h3>
                                <p className="text-gray-600 mb-2">{description}</p>
                                <button 
                                    className={`w-full py-2 px-4 rounded-md mt-3 transition-all ${status === 'Ongoing' ? 'bg-[#0FABCA] text-white' : status === 'Upcoming' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} 
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
   
            <div className="text-center mt-8">
                <Link to="/all-sessionP">
                    <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all">
                        See All Sessions
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default StudySessions;
