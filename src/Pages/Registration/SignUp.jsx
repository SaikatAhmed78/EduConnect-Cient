import React from 'react';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import signUpAnimation from '../../assets/lottie/Animation - 1736870503843.json';
import { FaUser, FaEnvelope, FaCamera, FaLock, FaGraduationCap } from 'react-icons/fa';
import Social from '../../Common/Social Login/Social';


const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">

            <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
                <Lottie animationData={signUpAnimation} loop autoplay className="w-full max-w-sm" />
            </div>


            <div className="w-full md:w-1/2 p-6">
                <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                    <div>
                        <label className="flex items-center mb-1 text-gray-600">
                            <FaUser className="mr-2" /> Name
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:border-indigo-500`}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="flex items-center mb-1 text-gray-600">
                            <FaEnvelope className="mr-2" /> Email
                        </label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: 'Invalid email format',
                                },
                            })}
                            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:border-indigo-500`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* photo */}
                    <div>
                        <label className="flex items-center mb-1 text-gray-600">
                            <FaCamera className="mr-2" /> Photo URL
                        </label>
                        <input
                            type="text"
                            {...register('photo')}
                            className={`w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500`}
                            placeholder="Enter photo URL"
                        />
                    </div>

                    {/* Password  */}
                    <div>
                        <label className="flex items-center mb-1 text-gray-600">
                            <FaLock className="mr-2" /> Password
                        </label>
                        <input
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: { value: 6, message: 'Minimum 6 characters required' },
                            })}
                            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:border-indigo-500`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Role  */}
                    <div>
                        <label className="flex items-center mb-1 text-gray-600">
                            <FaGraduationCap className="mr-2" /> Role
                        </label>
                        <select
                            {...register('role', { required: 'Role is required' })}
                            className={`w-full p-2 border ${errors.role ? 'border-red-500' : 'border-gray-300'
                                } rounded-lg focus:outline-none focus:border-indigo-500`}
                        >
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="tutor">Tutor</option>
                            <option value="admin">Admin</option>
                        </select>
                        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                    </div>



                    {/* Submit  */}
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-500 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Sign Up
                    </button>

                    <div className='mt-4'>
                        <Social></Social>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
