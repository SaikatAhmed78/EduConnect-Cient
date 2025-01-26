import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const ViewAllMaterialsA = () => {
    const queryClient = useQueryClient();
    
    // Fetch materials using TanStack Query
    const { data: materials = [], isLoading, error } = useQuery({
        queryKey: ['materials'],
        queryFn: async () => {
            try {
                const response = await axios.get('/materials');  
                return response.data;
            } catch (err) {
                console.error(err);
                throw new Error('Error fetching materials');
            }
        },
    });

    // Mutation to delete a material
    const { mutate: deleteMaterial } = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/materials/${id}`);  // Adjust the endpoint based on your API
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['materials']);  // Re-fetch materials after deletion
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching materials</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-semibold mb-6 text-center">All Materials</h1>
            <div className="space-y-4">
                {materials.map((material) => (
                    <div
                        key={material._id}
                        className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
                    >
                        <div className="flex-1">
                            <h3 className="text-xl font-medium">{material.title}</h3>
                            <p className="text-sm text-gray-600">{material.description}</p>
                        </div>
                        <div className="flex space-x-3">
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => deleteMaterial(material._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewAllMaterialsA;
