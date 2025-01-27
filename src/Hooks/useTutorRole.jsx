import React from 'react';
import useAuth from './useAuth';
import useAxiosUser from './useAxiosUser';
import { useQuery } from '@tanstack/react-query';

const useTutorRole = () => {

    const { user } = useAuth();
    const axiosUser = useAxiosUser();

    const { data: isTutor, isPending: isTutorPending } = useQuery({
        queryKey: ['isTutor', axiosUser, user?.email],
        queryFn: async () => {
            if (user) {
                const res = await axiosUser.get(`/users/tutor/${user?.email}`);
                const data = await res?.data;
               
                if (data) {
                    return data?.isTutor;
                }
            }
        }
    });

    return [isTutor, isTutorPending];
};

export default useTutorRole;