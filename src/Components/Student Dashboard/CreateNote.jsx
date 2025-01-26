import React, { useState } from 'react';
import axios from 'axios';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = { title, description };
        await axios.post('/notes', noteData);
        setTitle('');  // Clear the form after submission
        setDescription('');
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg bg-white p-8 rounded-lg shadow-lg ">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Note</h2>
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none">Create Note</button>
            </form>
        </div>
    );
};

export default CreateNote;
