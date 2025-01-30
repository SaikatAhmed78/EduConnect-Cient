// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAxiosUser from './useAxiosUser';

// const useReviews = (sessionId) => {
//     const axiosUser = useAxiosUser();
   
//     const { data: reviewData = [], isLoading: spinner, isError: err, error: erro, refetch } = useQuery({
//         queryKey: ['sessionDetails', sessionId],
//         queryFn: async () => {
//           const res = await axiosUser.get(`/sessions/${sessionId}`);
//           return res.data;
//         },
    
//       });
//       return [reviewData, spinner]
// };

// export default useReviews;