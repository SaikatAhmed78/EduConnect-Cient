import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import Social from '../../Common/Social Login/Social';
import loginImg from '../../assets/banner/4966434.jpg'

const Login = () => {
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState('');

    const onSubmit = async (data) => {
        try {
            setLoginError('');
            const response = await signIn(data.email, data.password);

            if (response.error) {
                setLoginError('Invalid credentials');
            } else {
                navigate('/');
            }
        } catch (error) {
            setLoginError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
                {/* Left Side: Image */}
                <div className="w-1/2 hidden lg:block">
                    <img
                        src={loginImg}
                        alt="Login Illustration"
                        className="w-full h-full object-cover rounded-l-lg"
                    />
                </div>

                {/* Right Side: Form */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                    <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">Welcome Back!</h2>
                    <p className="text-lg text-center text-gray-600 mb-6">Please login to access your account.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                            <div className="relative mt-2">
                                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="w-full p-3 pl-10 rounded-xl shadow-md border focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    placeholder="Enter your email"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                            <div className="relative mt-2">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password', { required: 'Password is required' })}
                                    className="w-full p-3 pl-10 rounded-xl shadow-md border focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                    placeholder="Enter your password"
                                />
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>

                        {loginError && <p className="text-red-500 text-xs mb-4">{loginError}</p>}

                        <button
                            type="submit"
                            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow-md hover:bg-indigo-700 transition duration-200"
                        >
                            Login
                        </button>
                    </form>

                    <div className='mt-6'>
                        <Social />
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
                        <span className="text-sm text-gray-500">Don't have an account?
                            <a href="/signup" className="text-indigo-600 hover:underline"> Sign Up</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
