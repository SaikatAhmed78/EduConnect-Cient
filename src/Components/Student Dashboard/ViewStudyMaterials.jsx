import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

const ViewStudyMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [sessionId, setSessionId] = useState('');

    useEffect(() => {
        if (sessionId) {
            axios.get(`/materials/${sessionId}`).then(response => {
                setMaterials(response.data);
            });
        }
    }, [sessionId]);

    return (
        <div className="flex flex-col items-center mt-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Study Materials</h1>
            <p className="text-gray-600 mb-6 text-center">Select a session to view the available study materials.</p>
            <div className="w-full max-w-lg mb-6">
                <select
                    onChange={(e) => setSessionId(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {/* Populate session options */}
                    <option value="">Select a session</option>
                    {/* Add session options here */}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {materials.map((material) => (
                    <div key={material._id} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                        <img src={material.image} alt={material.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">{material.title}</h2>
                        <div className="flex justify-between items-center">
                            <a
                                href={material.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 transition duration-300 flex items-center"
                            >
                                <FaExternalLinkAlt className="mr-2" /> Access Material
                            </a>
                            <a
                                href={material.image}
                                download
                                className="text-green-500 hover:text-green-700 transition duration-300 flex items-center"
                            >
                                <FaDownload className="mr-2" /> Download Image
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewStudyMaterials;
