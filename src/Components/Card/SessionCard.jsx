import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'; // Ensure dayjs is imported

const StudySessionCard = ({ session }) => {
    const { title, description, startDate, endDate, image, _id } = session;

    const getStatus = (startDate, endDate) => {
        const today = dayjs();
        if (today.isAfter(endDate)) return "Closed";
        if (today.isBefore(startDate)) return "Upcoming";
        return "Ongoing";
    };

    const status = getStatus(startDate, endDate);

    return (
        <div className="w-11/12 mx-auto sm:w-[80%] lg:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] after:z-[-2] after:transition-all after:duration-500">
            <img src={image} alt={title} className="w-full h-[200px] rounded-t-md object-cover" />
            
            <div className="p-[18px] pt-2.5 bg-white rounded-b-md">
                <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">{title}</h3>
                <p className="text-[1rem] font-[400] text-gray-600 mb-2">{description}</p>
                <button
                    className={`w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 rounded-md mt-5 ${status === "Ongoing" ? "bg-[#0FABCA] text-white" : status === "Upcoming" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
                >
                    {status}
                </button>
                <Link to={`dashboard/session-details-card/${_id}`}>
                    <button
                        className="w-full py-2 px-4 mt-3 border border-blue-500 text-blue-500 hover:bg-blue-100 transition-all duration-300 rounded-md"
                    >
                        Read More
                    </button>
                </Link>
            </div>
        </div>
    );
};

const StudySessions = () => {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/sessions?page=1&limit=6');
                setSessions(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching sessions:', error);
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-semibold text-center mb-10">Upcoming Study Sessions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {sessions.map((session) => (
                    <StudySessionCard
                        key={session._id}
                        session={session}
                    />
                ))}
            </div>
        </div>
    );
};

export default StudySessions;
