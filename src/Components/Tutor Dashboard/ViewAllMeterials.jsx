import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';

const ViewAllMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const tutorId = 'example-tutor-id'; // Replace with real tutor ID

    useEffect(() => {
        axios
            .get(`/materials/tutor/${tutorId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            })
            .then(response => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setMaterials(data); // Ensure materials is an array
                } else {
                    console.error('Unexpected data format:', data);
                    setMaterials([]); // Set to empty array if not an array
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching materials:', error);
                setMaterials([]);
                setLoading(false);
            });
    }, [tutorId]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`/materials/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    })
                    .then(() => {
                        setMaterials(materials.filter(material => material._id !== id));
                        Swal.fire('Deleted!', 'Your material has been deleted.', 'success');
                    })
                    .catch(error => {
                        console.error('Error deleting material:', error);
                        Swal.fire('Error!', 'Failed to delete the material.', 'error');
                    });
            }
        });
    };

    const handleUpdate = (id) => {
        Swal.fire({
            title: 'Enter new title:',
            input: 'text',
            inputPlaceholder: 'Enter new material title',
            showCancelButton: true,
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedTitle = result.value;
                if (updatedTitle) {
                    axios
                        .put(`/materials/${id}`, { title: updatedTitle }, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                            },
                        })
                        .then(() => {
                            setMaterials(materials.map(material =>
                                material._id === id ? { ...material, title: updatedTitle } : material
                            ));
                            Swal.fire('Updated!', 'Your material has been updated.', 'success');
                        })
                        .catch(error => {
                            console.error('Error updating material:', error);
                            Swal.fire('Error!', 'Failed to update the material.', 'error');
                        });
                }
            }
        });
    };

    if (loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-5">Your Uploaded Materials</h1>
            {materials.length === 0 ? (
                <p className="text-center text-gray-600">No materials uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map(material => (
                        <div key={material._id} className="p-4 border rounded shadow-lg">
                            <h2 className="text-xl font-semibold">{material.title}</h2>
                            <p className="text-gray-600">{material.description}</p>
                            <div className="mt-4 flex justify-between">
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    onClick={() => handleUpdate(material._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    onClick={() => handleDelete(material._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewAllMaterials;
