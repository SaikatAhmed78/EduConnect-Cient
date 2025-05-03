import React from "react";

const AboutUs = () => {
    return (
        <div className="text-gray-900 dark:text-gray-100">
            
            <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
                <div className="container mx-auto px-6 lg:px-20 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                        Welcome to Collaborative Study Platform
                    </h1>
                    <p className="text-lg lg:text-xl">
                        Bridging the gap between students and tutors through innovative learning.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <h2 className="text-3xl lg:text-4xl text-cyan-500 font-bold text-center mb-8">Our Mission</h2>
                    <p className="text-lg text-center text-teal-500 leading-relaxed">
                        At Collaborative Study Platform, we aim to create a seamless educational
                        experience by connecting students with expert tutors and providing an
                        inclusive environment for learning, collaboration, and growth.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-6 lg:px-20">
                    <h2 className="text-3xl lg:text-4xl text-cyan-500 font-bold text-center mb-12">What We Offer</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
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
                            <h3 className="text-xl font-semibold text-cyan-400 mb-4">Expert Tutors</h3>
                            <p className="text-teal-400">
                                Learn from highly qualified and experienced tutors dedicated to
                                your success.
                            </p>
                        </div>

                        <div className="text-center">
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
                            <h3 className="text-xl text-cyan-400 font-semibold mb-4">Interactive Learning</h3>
                            <p className=" text-teal-400">
                                Engage in collaborative and interactive study sessions designed to
                                enhance understanding.
                            </p>
                        </div>

                        <div className="text-center">
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
                            <h3 className="text-xl text-cyan-400 font-semibold mb-4">Resource Sharing</h3>
                            <p className="text-teal-400">
                                Access a library of study materials and share your notes for
                                collaborative growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-12">
                <div className="container mx-auto px-6 lg:px-20 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                        Ready to Transform Your Learning Experience?
                    </h2>
                    <p className="text-lg mb-6">
                        Join our platform today and embark on a journey to academic success.
                    </p>
                    <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-lg hover:bg-gray-100">
                        Get Started
                    </button>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
