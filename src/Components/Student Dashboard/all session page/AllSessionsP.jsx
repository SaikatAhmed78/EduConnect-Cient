import { useState } from "react";
import useAxiosUser from "../../../Hooks/useAxiosUser";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../Common/Spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { Info } from "lucide-react";

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

    const { sessions = [], totalPages = 0 } = data;

    return (
        <div className="w-11/12 mx-auto py-12 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
                <h1 className="text-4xl font-bold text-cyan-600">📚 All Study Sessions</h1>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="mt-4 sm:mt-0 p-2 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                    <option value="asc">Sort by Price: Low to High</option>
                    <option value="desc">Sort by Price: High to Low</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {sessions.map(({ _id, title, description, startDate, image, registrationStartDate, registrationEndDate }) => {
                    const now = new Date();
                    const start = new Date(startDate);
                    const regStart = new Date(registrationStartDate);
                    const regEnd = new Date(registrationEndDate);

                    let status = '';
                    let statusColor = '';

                    if (now > regEnd) {
                        status = 'Closed';
                        statusColor = 'bg-red-500';
                    } else if (now < regStart) {
                        status = 'Upcoming';
                        statusColor = 'bg-green-500';
                    } else {
                        status = 'Ongoing';
                        statusColor = 'bg-cyan-500';
                    }

                    const formattedStartDate = start.toLocaleDateString('en-US', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
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
                                {formattedStartDate}
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

            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 mt-12">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-lg font-semibold">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-5 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllSessionsP;
