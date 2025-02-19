import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosUser from "../../Hooks/useAxiosUser";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const TutorStaticks = () => {
    const axiosUser = useAxiosUser();

    const { data: users = [], isPending, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosUser.get('/information');
            console.log(res.data)
            return res.data;
        }
    });

    if (isPending) {
        return <p className="text-center text-gray-500 text-xl">Loading tutor information...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500 text-xl">Failed to load tutor data. Please try again.</p>;
    }

    return (
        <section className="py-10 px-4 mt-10">
            <div className="w-11/12 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-6 text-cyan-500">
                    Tutor Information
                </h2>
                <p className="text-center text-teal-400 mb-10">
                    Meet our dedicated tutors who are ready to help you learn and grow.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {users.map((user) => (
                        <div key={user._id} className="w-full rounded-md relative group overflow-hidden">
                            {/* Image */}
                            {user.photo && (
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="w-full h-[350px] object-cover"
                                />
                            )}

                            {/* User Info */}
                            <div className="flex flex-col items-center justify-center backdrop-blur-sm text-white absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
                                <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100">
                                    {user.name}
                                </h3>
                                <div className="flex items-center gap-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <MdEmail className="text-xl text-white" />
                                    <p className="text-[1rem]">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <FaUserTie className="text-xl text-white" />
                                    <p className="text-[1rem]">Role: {user.role}</p>
                                </div>
                                <div className="flex items-center gap-[8px] mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <FaChalkboardTeacher className="text-xl text-white" />
                                    <p className="text-[1rem]">Experienced Tutor</p>
                                </div>

                                {/* Social Media Icons */}
                                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <FaFacebook className="text-3xl text-blue-600 hover:text-blue-800" />
                                    <FaInstagram className="text-3xl text-pink-600 hover:text-pink-800" />
                                    <FaTwitter className="text-3xl text-blue-400 hover:text-blue-600" />
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
