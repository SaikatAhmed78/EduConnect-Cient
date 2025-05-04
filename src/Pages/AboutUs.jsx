import React from "react";

const AboutUs = () => {
    return (
        <div className="text-gray-900 dark:text-gray-100">
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 px-6 lg:px-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto relative text-center z-10">
                    <h1 className="text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-wide leading-tight">
                        Welcome to Collaborative Study Platform
                    </h1>
                    <p className="text-lg lg:text-xl font-medium">
                        Bridging the gap between students and tutors through innovative learning.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 text-center">
                <div className="container mx-auto px-6 lg:px-20">
                    <h2 className="text-4xl text-cyan-500 font-bold mb-6">Our Mission</h2>
                    <p className="text-lg text-teal-500 leading-relaxed max-w-3xl mx-auto">
                        At Collaborative Study Platform, we aim to create a seamless educational experience by connecting students with expert tutors and providing an inclusive environment for learning, collaboration, and growth.
                    </p>
                </div>
            </section>

            {/* What We Offer Section */}
            <section className="py-20">
                <div className="container mx-auto px-6 lg:px-20 text-center">
                    <h2 className="text-4xl text-cyan-500 font-bold mb-12">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Expert Tutors */}
                        <div className="transition-all transform hover:scale-105 duration-300 text-center p-6 shadow-xl rounded-lg hover:bg-indigo-50">
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mx-auto mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 20l9-5-9-5-9 5 9 5zm0-5l9-5-9-5-9 5 9 5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Expert Tutors</h3>
                            <p className="text-teal-400">
                                Learn from highly qualified and experienced tutors dedicated to your success.
                            </p>
                        </div>

                        {/* Interactive Learning */}
                        <div className="transition-all transform hover:scale-105 duration-300 text-center p-6 shadow-xl rounded-lg hover:bg-indigo-50">
                            <div className="flex items-center justify-center w-16 h-16 bg-indigo-500 text-white rounded-full mx-auto mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c2.28 0 4-1.72 4-4s-1.72-4-4-4-4 1.72-4 4 1.72 4 4 4zm0 3c-5.33 0-8 2.67-8 8v1h16v-1c0-5.33-2.67-8-8-8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Interactive Learning</h3>
                            <p className="text-teal-400">
                                Engage in collaborative and interactive study sessions designed to enhance understanding.
                            </p>
                        </div>

                        {/* Resource Sharing */}
                        <div className="transition-all transform hover:scale-105 duration-300 text-center p-6 shadow-xl rounded-lg hover:bg-indigo-50">
                            <div className="flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mx-auto mb-6">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.75 16L4 10.25m0 0L9.75 4M4 10.25h16"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Resource Sharing</h3>
                            <p className="text-teal-400">
                                Access a library of study materials and share your notes for collaborative growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20">
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="container mx-auto px-6 lg:px-20 text-center relative z-10">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                        Ready to Transform Your Learning Experience?
                    </h2>
                    <p className="text-lg mb-6">
                        Join our platform today and embark on a journey to academic success.
                    </p>
                    <button className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-full shadow-xl transform transition-all hover:bg-gray-100 hover:scale-105">
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
