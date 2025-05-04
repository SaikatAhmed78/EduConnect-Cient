import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { MdEmail } from "react-icons/md";
import { FaUserTie, FaChalkboardTeacher, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { School } from "lucide-react";

const TutorStaticks = () => {
    const axiosUser = useAxiosUser();

    const { data: users = [], isPending, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosUser.get('/information');
            return res.data;
        }
    });

    if (isPending) {
        return <p className="text-center text-gray-500 text-xl dark:text-gray-300">Loading tutor information...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">Failed to load tutor data. Please try again.</p>;
    }

    return (
        <section className="py-12 px-4 mt-10">
            <div className="w-11/12 mx-auto">


                <h2 className="text-2xl  md:text-2xl lg:text-4xl font-bold text-center mb-6 sm:mb-10 text-cyan-500 flex flex-wrap items-center justify-center gap-2 text-balance leading-snug">
                    <School className="text-red-500 animate-pulse shrink-0" />
                    <span className="text-center">Your Learning Journey Begins with Our Tutors</span>
                </h2>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {users.slice(0, 6).map((user) => (
                        <motion.div
                            key={user._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow duration-500"
                        >
                            {user.photo && (
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            )}

                            <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 group-hover:bg-opacity-70 transition-all duration-300 backdrop-blur-0" />

                            <div className="absolute bottom-0 p-5 text-white w-full z-10">
                                <h3 className="text-2xl font-bold mb-1">{user.name}</h3>
                                <div className="text-sm flex flex-col gap-1">
                                    <p className="flex items-center gap-2"><MdEmail /> {user.email}</p>
                                    <p className="flex items-center gap-2"><FaUserTie /> Role: {user.role}</p>
                                    <p className="flex items-center gap-2"><FaChalkboardTeacher /> Experienced Tutor</p>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <FaFacebook className="text-xl hover:text-blue-500 transition-colors duration-300" />
                                    <FaInstagram className="text-xl hover:text-pink-500 transition-colors duration-300" />
                                    <FaTwitter className="text-xl hover:text-sky-400 transition-colors duration-300" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TutorStaticks;
