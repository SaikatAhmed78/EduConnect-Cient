import React from 'react';

const NewsletterSubscription = () => {
    return (
        <div className="bg-gray-800 text-white p-10 rounded-lg mt-10 shadow-lg my-10">
            <h2 className="text-2xl text-cyan-500 font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6 text-teal-400">Get the latest updates and study tips straight to your inbox!</p>
            <form className="flex flex-col sm:flex-row gap-4">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="p-2 rounded-lg w-full sm:w-2/3 text-black"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full sm:w-1/3"
                >
                    Subscribe
                </button>
            </form>
        </div>
    );
};

export default NewsletterSubscription;
