import React from 'react';
import useAuth from './useAuth';
import useAxiosUser from './useAxiosUser';
import { useQuery } from '@tanstack/react-query';

const useAdminRole = () => {
    const { user } = useAuth();
    const axiosUser = useAxiosUser();

    const { data: isAdmin, isPending } = useQuery({
        queryKey: ['isAdmin', axiosUser, user?.email],
        queryFn: async () => {
            if (user) {
                const res = await axiosUser.get(`/users/admin/${user?.email}`);
                const data = await res?.data;
                console.log(data)
                if (data) {
                    return data?.isAdmin;
                }
            }
        }
    });

    return [isAdmin, isPending];
};

export default useAdminRole;