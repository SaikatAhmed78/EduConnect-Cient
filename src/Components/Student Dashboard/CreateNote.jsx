import React, { useState } from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import axios from 'axios';
import useAxiosUser from '../../Hooks/useAxiosUser';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { user } = useAuth();
    const axiosUser = useAxiosUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const noteData = { title, description, userEmail: user?.email };
        try {
            const response = await axiosUser.post('/notes', noteData);
            if (response.status === 200 || response.status === 201) {
                setTitle('');
                setDescription('');
                Swal.fire({
                    title: 'Success!',
                    text: 'Note created successfully!',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    background: '#fff',
                    iconColor: '#4CAF50',
                    confirmButtonColor: '#4CAF50',
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong, please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
                background: '#fff',
                iconColor: '#F44336',
                confirmButtonColor: '#F44336',
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-12">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-700">Create a New Note</h2>
                <p className="text-lg text-gray-500">Please fill in the details to create a new note.</p>
            </div>
            <form onSubmit={handleSubmit} className="w-3/4 max-w-md bg-white rounded-lg p-8 shadow-lg border border-gray-300 transition duration-300 ease-in-out hover:shadow-xl">
                <div className="mb-4 flex items-center">
                    <FaRegFileAlt className="text-blue-500 text-xl mr-2" />
                    <label htmlFor="email" className="block text-gray-700 text-sm font-semibold">Email</label>
                </div>
                <input 
                    type="email" 
                    id="email" 
                    value={user?.email} 
                    readOnly 
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-4"
                />

                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none" 
                        rows="5"
                    ></textarea>
                </div>

                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out duration-300 transform hover:scale-105"
                    >
                        Create Note
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNote;
