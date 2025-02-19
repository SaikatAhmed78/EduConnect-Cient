import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../../Hooks/useAxiosUser';
import LoadingSpinner from '../../../Common/Spinner/LoadingSpinner';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const AllSessionsP = () => {
    const axiosUser = useAxiosUser();
    const [page, setPage] = useState(1); 
    const limit = 6; 

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allStudySessions', page], 
        queryFn: async () => {
            const res = await axiosUser.get(`/allSessions?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true, 
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p className="text-red-500 text-center">Error fetching sessions.</p>;

    const { sessions = [], totalSessions = 0, totalPages = 0 } = data;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-semibold text-cyan-500 text-center mb-10">All Study Sessions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {sessions.map(({ _id, title, description, startDate, endDate, image, registrationStartDate, registrationEndDate }) => {
                    const today = dayjs();
                    const registrationClosed = today.isAfter(registrationEndDate);
                    const status = registrationClosed
                        ? 'Closed'
                        : today.isBefore(startDate)
                        ? 'Upcoming'
                        : 'Ongoing';

                    return (
                        <div
                            key={_id}
                            className="w-11/12 mx-auto sm:w-[80%] lg:w-[60%] shadow-md hover:shadow-none bg-white rounded-md relative group"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-[200px] rounded-t-md object-cover"
                            />
                            <div className="p-4 bg-white rounded-b-md">
                                <h3 className="text-2xl font-bold text-[#0FABCA]">{title}</h3>
                                <p className="text-gray-600 mb-2">{description}</p>
                                <button
                                    className={`w-full py-2 px-4 rounded-md mt-3 transition-all ${
                                        status === 'Ongoing'
                                            ? 'bg-[#0FABCA] text-white'
                                            : status === 'Upcoming'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                    }`}
                                    disabled={registrationClosed} // Disable if registration is closed
                                >
                                    {registrationClosed ? 'Closed' : status}
                                </button>
                                <Link to={`/dashboard/session-details-card/${_id}`}>
                                    <button className="w-full py-2 px-4 mt-3 border border-blue-500 text-blue-500 hover:bg-blue-100 transition-all rounded-md">
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-center mt-8 space-x-4">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="flex items-center text-lg font-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllSessionsP;
