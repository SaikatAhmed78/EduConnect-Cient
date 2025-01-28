import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../../Hooks/useAxiosUser';
import LoadingSpinner from '../../../Common/Spinner/LoadingSpinner';

const SessionDetail = () => {
  const { id } = useParams();  
  const axiosUser = useAxiosUser();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);  1


  const { data: session, isLoading, isError, error } = useQuery({
    queryKey: ['sessionDetail', id],
    queryFn: async () => {
      const response = await axiosUser.get(`/sessions/${id}`);
      return response.data;
    }
  });

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const reviewData = { rating, reviewText: review };

   
    axiosUser.post(`/sessions/${id}/review`, reviewData)
      .then(() => {
        alert('Review submitted successfully!');
      })
      .catch((error) => {
        alert('Error submitting review: ' + error.message);
      });
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="bg-gray-900 min-h-screen py-10 px-6 text-white">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-6">{session.title}</h2>
        <p className="text-lg text-gray-300 mb-4">{session.description}</p>
        <p className="text-sm text-gray-400">Date: {session.date}</p>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white">Leave a Review</h3>
          <form onSubmit={handleSubmitReview} className="mt-4">
            <div className="flex items-center">
              <label className="mr-4 text-white">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-gray-800 text-white py-2 px-4 rounded-lg"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>{star}</option>
                ))}
              </select>
            </div>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full mt-4 bg-gray-800 text-white p-4 rounded-lg"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg mt-4 transition-all duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
