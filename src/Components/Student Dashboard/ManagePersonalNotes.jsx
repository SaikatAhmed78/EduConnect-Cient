
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePersonalNotes = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios.get('/notes').then(response => {
            setNotes(response.data);
        });
    }, []);

    const handleDelete = async (noteId) => {
        await axios.delete(`/notes/${noteId}`);
        setNotes(notes.filter(note => note._id !== noteId));
    };

    const handleEdit = (note) => {
        // Handle editing note
    };

    return (
        <div className="container">
            {notes.map((note) => (
                <div key={note._id} className="note-card">
                    <h3>{note.title}</h3>
                    <p>{note.description}</p>
                    <button onClick={() => handleEdit(note)}>Edit</button>
                    <button onClick={() => handleDelete(note._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
export default ManagePersonalNotes;
