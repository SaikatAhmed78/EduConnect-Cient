import React, { useEffect, useState } from 'react';
import useAxiosAdmin from '../../Hooks/useAxiosAdmin';


const ViewAllUsers = () => {
    const axiosAdmin = useAxiosAdmin();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosAdmin.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [axiosAdmin]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosAdmin.patch(`/users/${userId}`, { role: newRole });
            setUsers(users.map(user =>
                user._id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="border px-4 py-2">{user.name || 'N/A'}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <select
                                    value={user.role || 'student'}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                    className="border p-1"
                                >
                                    <option value="student">Student</option>
                                    <option value="tutor">Tutor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Make Admin
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllUsers;
