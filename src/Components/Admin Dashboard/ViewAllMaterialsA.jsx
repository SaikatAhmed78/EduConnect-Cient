import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';

const ViewAllMaterialsA = () => {
    const queryClient = useQueryClient();
    const axiosUser = useAxiosUser();

   
    const { data: materials = [], isLoading, error } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            try {
                const response = await axiosUser.get('/getAllMeterials');
                return response.data;
            } catch (err) {
                console.error(err);
                throw new Error('Error fetching materials');
            }
        },
    });

  
    const { mutate: deleteMaterial } = useMutation({
        mutationFn: async (id) => {
            await axiosUser.delete(`/materials/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['materials']);  
        },
    });

    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-red-500 text-center">Error fetching materials</div>;

    return (
        <div className="container mx-auto p-6 ml-8">
            <h1 className="text-4xl font-semibold mb-6 text-center text-blue-600">All Materials</h1>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg table-auto">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">Title</th>
                            <th className="py-3 px-6 text-left">Material Link</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materials.map((material) => (
                            <tr key={material._id} className="border-b hover:bg-gray-100">
                                <td className="py-3 px-6 text-left font-medium">{material.title}</td>

                                <td className="py-3 px-6 text-left">
                                    <a
                                        href={material.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        View Material
                                    </a>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <button
                                        onClick={() => deleteMaterial(material._id)}
                                        className="text-red-500 hover:text-red-700 "
                                    >
                                        Remove
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllMaterialsA;
