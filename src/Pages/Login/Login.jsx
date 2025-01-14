import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const Login = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log('Form submitted with:', data);
        // Add login logic here
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <div className="flex items-center border border-gray-300 rounded-lg mt-2">
                            <FaUserAlt className="text-gray-400 ml-3" />
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <div className="flex items-center border border-gray-300 rounded-lg mt-2">
                            <FaLock className="text-gray-400 ml-3" />
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className="w-full p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="flex justify-between items-center mt-4">
                    <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
                    <span className="text-sm text-gray-500">Don't have an account?
                        <a href="/signup" className="text-indigo-600 hover:underline"> Sign Up</a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;
