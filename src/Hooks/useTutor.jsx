import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosUser from './useAxiosUser';


const useTutor = () => {
    const { user } = useAuth();
    const axiosUser = useAxiosUser();

    const { data: materialsData, isLoading: materialsLoading, refetch } = useQuery({
        queryKey: ['createSession', user?.email],
        queryFn: async () => {
            const res = await axiosUser.post(`/create-session`);

            return res.data;
        }
    });

    return { materialsData, materialsLoading, refetch };
};

export default useTutor;
