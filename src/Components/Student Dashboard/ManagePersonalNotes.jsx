import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAxiosUser from '../../Hooks/useAxiosUser';
import useAuth from '../../Hooks/useAuth';


const ManagePersonalNotes = () => {
    const [editNote, setEditNote] = useState(null);
    const axiosUser = useAxiosUser();
    const { user } = useAuth(); 

    const { data: notes = [], isLoading, refetch } = useQuery({
        queryKey: ['notes', user?.email], 
        queryFn: async () => {
            const res = await axiosUser.get('/all-notes', { params: { email: user?.email } });
            const data = res.data;
            return data;
        },
        enabled: !!user?.email,
    });

   
    const handleDelete = async (noteId) => {
       
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This note will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
        });
    
        if (result.isConfirmed) {
            try {
            
                await axiosUser.delete(`/notes/${noteId}`);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your note has been deleted.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                
                refetch();
            } catch (error) {

                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while deleting the note.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
                console.error('Error deleting note:', error);
            }
        }
    };
    

    // Handle note edit
    const handleEdit = (note) => {
        setEditNote(note);
    };

    // Handle save edited note
    const handleSaveEdit = async () => {
        if (editNote) {
            try {
                await axiosUser.put(`/notes/${editNote._id}`, editNote);
                Swal.fire({
                    title: 'Updated!',
                    text: 'Your note has been updated.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setEditNote(null);
                refetch();
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong while updating the note.',
                    icon: 'error',
                    confirmButtonText: 'Okay',
                });
            }
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center text-cyan-500 mb-8">Manage Your Personal Notes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes?.map((note) => (
                    <div key={note._id} className="note-card bg-white p-6 rounded-lg shadow-md">
                        {editNote?._id === note._id ? (
                            <div>
                                <input
                                    type="text"
                                    className="w-full mb-4 p-3 border border-gray-300 rounded-md"
                                    value={editNote.title}
                                    onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                                />
                                <textarea
                                    className="w-full mb-4 p-3 border border-gray-300 rounded-md"
                                    rows="4"
                                    value={editNote.description}
                                    onChange={(e) =>
                                        setEditNote({ ...editNote, description: e.target.value })
                                    }
                                />
                                <button
                                    onClick={handleSaveEdit}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                                >
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                                <p className="mb-4">{note.description}</p>
                                <div className="flex justify-between">
                                    <button
                                        onClick={() => handleEdit(note)}
                                        className="bg-yellow-500 text-white py-1 px-4 rounded-md"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note._id)}
                                        className="bg-red-500 text-white py-1 px-4 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManagePersonalNotes;
