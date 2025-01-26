import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../Hooks/useAxiosUser';

const ViewAllMaterials = () => {

    const [loading, setLoading] = useState(false);


    const axiosUser = useAxiosUser();


    const { data: allMeterials = [], isPending, refetch } = useQuery({
        queryKey: ['allMeterials'],
        queryFn: async () => {
            const res = await axiosUser.get('/getAllMeterials')
            const data = res.data;

            return data;
        }
    })


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosUser.delete(`/materials/${id}`);
                    const data = await res.data;


                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                        });
                        refetch();
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'There was an issue deleting the file. Please try again later.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                    });
                }
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

        }).then(async (result) => {
            if (result.isConfirmed) {
                const updatedTitle = result.value;
                console.log(updatedTitle)

                if (updatedTitle) {

                    try {
                        const res = await axiosUser.patch(`/updateMeterial/${id}`, { updatedTitle })
                        const data = await res.data;
                        console.log(data)

                        if (data.modifiedCount > 0) {
                            Swal.fire({
                                title: 'Updated!',
                                text: 'Your file has been Updated.',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                            });

                            refetch();
                        }

                    }
                    catch (error) {
                        console.log(error)
                    }
                }
            }
        });
    };

    if (loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-5">Your Uploaded Materials</h1>
            {allMeterials.length === 0 ? (
                <p className="text-center text-gray-600">No materials uploaded yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMeterials.map(material => {
                        return (
                            <div key={material._id} className="p-4 border rounded shadow-lg">
                                <h2 className="text-xl font-semibold">{material.title}</h2>

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
                        )
                    })}
                </div>
            )}
        </div>
    );
};

export default ViewAllMaterials;
