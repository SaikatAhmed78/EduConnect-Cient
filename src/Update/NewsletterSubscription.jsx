import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi'; // Email icon
import { FaSpinner } from 'react-icons/fa'; // Spinner icon for loading effect

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubscription = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setMessage('Subscription successful! 🎉');
            setIsLoading(false);
            setEmail('');
        }, 2000);
    };

    return (
        <div className="w-11/12 mx-auto relative p-10 rounded-2xl shadow-2xl my-10 backdrop-blur-sm bg-opacity-20 border border-gray-700">
            <h1 className="text-4xl font-bold text-cyan-400 text-center mb-2">Welcome to Our Community!</h1>
            <h2 className="text-3xl font-extrabold mb-4 text-cyan-500">
                Subscribe to Our Newsletter
            </h2>
            <p className="mb-6 text-teal-400">
                Get the latest updates and study tips straight to your inbox!
            </p>

            <form onSubmit={handleSubscription} className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:w-2/3">
                    <FiMail className="absolute left-2 top-3 text-gray-500" size={20} />
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 p-3 rounded-lg w-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold p-3 rounded-lg w-full sm:w-1/3 flex items-center justify-center transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <FaSpinner className="animate-spin" size={20} />
                    ) : (
                        'Subscribe'
                    )}
                </button>
            </form>

            {message && (
                <p className="mt-4 text-green-400 font-semibold text-center">{message}</p>
            )}
        </div>
    );
};

export default NewsletterSubscription;
