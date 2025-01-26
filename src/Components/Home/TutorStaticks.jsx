import React from "react";

const tutors = [
    {
        id: 1,
        name: "John Doe",
        specialization: "Mathematics",
        rating: 4.8,
        photo: "https://img.freepik.com/free-photo/teacher-smart-instructor-grey-suit-classroom-with-computer-whiteboard-explaining-lecture_140725-163299.jpg?semt=ais_hybrid",
        description: "John is a seasoned mathematician with over 10 years of teaching experience, helping students excel in complex calculations and problem-solving techniques."
    },
    {
        id: 2,
        name: "Jane Smith",
        specialization: "Physics",
        rating: 4.6,
        photo: "https://img.freepik.com/free-photo/smiling-showing-one-male-teacher-wearing-glasses-holding-number-fans-sitting-table-with-school-tools-classroom_141793-114349.jpg?semt=ais_hybrid",
        description: "Jane specializes in making physics concepts easy to understand, with a focus on practical applications and innovative teaching methods."
    },
    {
        id: 3,
        name: "Emily Johnson",
        specialization: "Chemistry",
        rating: 4.9,
        photo: "https://img.freepik.com/free-photo/teacher-brunette-instructor-with-computer-suit-whiteboard-classroom-pointing-board_140725-163269.jpg?semt=ais_hybrid",
        description: "Emily has a knack for breaking down complex chemical equations and theories, making learning enjoyable for her students."
    },
    {
        id: 4,
        name: "Michael Brown",
        specialization: "Biology",
        rating: 4.7,
        photo: "https://img.freepik.com/free-photo/smiley-businessman-presenting-whiteboard_23-2147643105.jpg?semt=ais_hybrid",
        description: "Michael's engaging teaching style brings the wonders of biology to life, from cell structures to ecosystems."
    },
    {
        id: 5,
        name: "Sophia Williams",
        specialization: "English Literature",
        rating: 4.9,
        photo: "https://img.freepik.com/free-photo/young-mother-working-from-home-with-daughter_329181-18974.jpg?semt=ais_hybrid",
        description: "Sophia is passionate about literature, guiding students through classic and modern works with insightful analysis and discussions."
    },
    {
        id: 6,
        name: "David Miller",
        specialization: "History",
        rating: 4.8,
        photo: "https://img.freepik.com/premium-photo/student-teacher-class_265223-88329.jpg?semt=ais_hybrid",
        description: "David brings history to life with vivid storytelling, connecting past events to present-day relevance and lessons."
    }
];

const TutorStaticks = () => {
    return (
        <section className="py-10 px-4">
            <div className="w-11/12 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
                    Meet Our Expert Tutors
                </h2>
                <p className="text-center text-gray-600 mb-10">
                    Learn from the best tutors in the industry. Our experts are here to
                    guide you every step of the way.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutors.map((tutor) => (
                        <div
                            key={tutor.id}
                            className="group [perspective:1000px] w-full h-[400px]"
                        >
                            <div
                                className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                            >

                                <div className="absolute w-full h-full backface-hidden [backface-visibility:hidden]">
                                    <img
                                        src={tutor.photo}
                                        alt={tutor.name}
                                        className="w-full h-full cursor-pointer object-cover rounded-lg shadow-lg"
                                    />
                                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)]">
                                        {tutor.name}
                                    </h3>
                                </div>


                                <div
                                    className="absolute w-full h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-6"
                                >
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {tutor.name}
                                    </h3>
                                    <p className="text-gray-600 mb-2">{tutor.specialization}</p>
                                    <p className="text-gray-700 text-sm mb-4">{tutor.description}</p>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500 text-lg mr-2">★</span>
                                        <p className="text-gray-700 font-semibold">
                                            {tutor.rating.toFixed(1)} / 5
                                        </p>
                                    </div>
                                    <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TutorStaticks;
