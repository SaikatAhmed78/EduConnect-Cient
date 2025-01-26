import React, { useState } from 'react';

const StudySessionCard = ({ title, description, isOngoing, onReadMore }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex items-center justify-between">
                    <button
                        className={`px-4 py-2 rounded-full text-white ${isOngoing ? 'bg-green-500' : 'bg-red-500'} hover:bg-opacity-80`}
                    >
                        {isOngoing ? 'Ongoing' : 'Closed'}
                    </button>
                    <button
                        className="px-4 py-2 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-100"
                        onClick={onReadMore}
                    >
                        Read More
                    </button>
                </div>
            </div>
        </div>
    );
};

const StudySessions = () => {
    const [sessions] = useState([
        { id: 1, title: 'React.js Masterclass', description: 'A deep dive into React.js concepts, hooks, and state management.', registrationDeadline: '2025-01-25' },
        { id: 2, title: 'Node.js Backend Development', description: 'Learn how to build scalable and efficient APIs using Node.js and Express.', registrationDeadline: '2025-01-15' },
        { id: 3, title: 'Advanced CSS Techniques', description: 'Master responsive layouts, flexbox, grid systems, and animations.', registrationDeadline: '2025-01-30' },
        { id: 4, title: 'JavaScript for Beginners', description: 'Learn JavaScript fundamentals with hands-on examples and exercises.', registrationDeadline: '2025-01-18' },
        { id: 5, title: 'Web Design with Figma', description: 'A complete guide to web design and prototyping using Figma tool.', registrationDeadline: '2025-02-01' },
        { id: 6, title: 'Database Management with SQL', description: 'Learn relational database concepts, SQL queries, and database management practices.', registrationDeadline: '2025-01-10' },
    ]);

    const checkIfOngoing = (deadline) => {
        const currentDate = new Date();
        const regDate = new Date(deadline);
        return regDate >= currentDate;
    };

    const handleReadMore = (title) => {
        alert(`Read more about: ${title}`);
    };

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-4xl font-semibold text-center mb-10">Upcoming Study Sessions</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {sessions.map((session) => (
                    <StudySessionCard
                        key={session.id}
                        title={session.title}
                        description={session.description}
                        isOngoing={checkIfOngoing(session.registrationDeadline)}
                        onReadMore={() => handleReadMore(session.title)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StudySessions;
