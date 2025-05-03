import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../../Hooks/useAxiosUser';
import LoadingSpinner from '../../../Common/Spinner/LoadingSpinner';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const AllSessionsP = () => {
    const axiosUser = useAxiosUser();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState('asc');
    const limit = 6;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['allStudySessions', page, sortOrder],
        queryFn: async () => {
            const res = await axiosUser.get(`/allSessions?page=${page}&limit=${limit}&sort=${sortOrder}`);
            return res.data;
        },
        keepPreviousData: true,
    });

    if (isLoading) return <LoadingSpinner />;
    if (isError) return <p className="text-red-500 text-center">Error fetching sessions.</p>;

    const { sessions = [], totalSessions = 0, totalPages = 0 } = data;

    return (
        <div className="w-11/12 mx-auto py-10">
            <h1 className="text-4xl font-semibold text-cyan-500 text-center mb-10">All Study Sessions</h1>
            
            <div className="flex justify-end mb-6">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {sessions.map(({ _id, title, description, startDate, endDate, image, registrationStartDate, registrationEndDate }) => {
                    const today = dayjs();
                    const registrationClosed = today.isAfter(registrationEndDate);
                    const status = registrationClosed
                        ? 'Closed'
                        : today.isBefore(startDate)
                        ? 'Upcoming'
                        : 'Ongoing';
                    const statusColor = registrationClosed
                        ? 'bg-red-500'
                        : today.isBefore(startDate)
                        ? 'bg-green-500'
                        : 'bg-cyan-500';

                    return (
                        <div
                            key={_id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-800 hover:text-cyan-600 transition-colors duration-200">
                                    {title}
                                </h3>
                                <p className="text-gray-500 mt-2 mb-4 text-lg">{description.slice(0, 100)}...</p>
                                
                                <span className={`px-3 py-1 rounded-full text-white text-sm ${statusColor}`}>{status}</span>
                                
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
