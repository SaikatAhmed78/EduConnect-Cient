import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosUser from '../../Hooks/useAxiosUser';
import LoadingSpinner from '../../Common/Spinner/LoadingSpinner';

const ViewAllUsers = () => {
    const axiosUser = useAxiosUser();
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            try {
                const res = await axiosUser.get(`/users?search=${search}`);
                return res.data;
            } catch (error) {
                console.error(error);
                return [];
            }
        },
    });

    const handleRoleChange = async (userId, newRole) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to change the user's role to ${newRole}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
        });

        if (result.isConfirmed) {
            try {
                const response = await axiosUser.patch(`/users/${userId}`, {
                    role: newRole,
                });

                if (response.status === 200) {
                    Swal.fire('Success!', 'User role updated successfully.', 'success');
                    refetch();
                }
            } catch (error) {
                console.error('Error updating role:', error);
                Swal.fire('Error!', 'Failed to update the user role. Please try again.', 'error');
            }
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">All Users</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by Name or Email"
                className="input input-bordered input-primary w-full sm:max-w-md mb-4"
                value={search}
                onChange={handleSearchChange}
            />

            {/* Responsive Table */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 text-sm sm:text-base">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Email</th>
                            <th className="border px-3 py-2">Role</th>
                            <th className="border px-3 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 text-center">
                                <td className="border px-3 py-2">{user.name || 'N/A'}</td>
                                <td className="border px-3 py-2">{user.email}</td>
                                <td className="border px-3 py-2">{user.role}</td>
                                <td className="border px-3 py-2">
                                    <select
                                        className="select w-full border p-1 rounded text-sm sm:text-base"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    >
                                        <option value={user.role} disabled>
                                            {user.role}
                                        </option>
                                        {['admin', 'tutor', 'student']
                                            .filter((role) => role !== user.role)
                                            .map((role) => (
                                                <option key={role} value={role}>
                                                    {role}
                                                </option>
                                            ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewAllUsers;
