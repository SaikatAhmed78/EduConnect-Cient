import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosUser from '../../../Hooks/useAxiosUser';
import LoadingSpinner from '../../../Common/Spinner/LoadingSpinner';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const SessionDetail = () => {
  const { id: sessionId } = useParams();
  const axiosUser = useAxiosUser();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['sessionDetail', sessionId],
    queryFn: async () => {
      const response = await axiosUser.get(`/sessions/${sessionId}`);
      return response.data.sessionDetails;
    },
  });

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!review.trim()) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Review text cannot be empty.',
        });
        return;
    }
    if (rating < 1 || rating > 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Rating must be between 1 and 5.',
        });
        return;
    }

    const reviewData = { rating: parseInt(rating), reviewText: review };

    try {
        await axiosUser.post(`/sessions/${sessionId}/review`, reviewData);
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Review submitted successfully!',
        });
        setReview('');
        setRating(1);
        refetch();
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error submitting review: ' + err.message,
        });
    }
};


  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div className="text-center py-4 text-red-500">Error: {error.message}</div>;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="py-10 px-6 text-white">
      <div className="container mx-auto max-w-3xl bg-gray-800 rounded-xl shadow-lg p-8">
        <h2 className="text-4xl font-extrabold mb-6 text-center bg-gradient-to-r from-pink-500 to-yellow-500 text-transparent bg-clip-text">
          {data.title}
        </h2>
        <p className="text-lg text-gray-300 mb-4 leading-relaxed">{data.description}</p>
        <p className="text-sm text-gray-400 mb-2">
          Class Start: <span className="text-white font-medium">{formatDate(data.classStartDate)}</span>
        </p>
        <p className="text-sm text-gray-400 mb-2">
          Class End: <span className="text-white font-medium">{formatDate(data.classEndDate)}</span>
        </p>
        <p className="text-sm text-gray-400 mb-6">
          Tutor: <span className="text-white font-medium">{data.tutorName}</span>
        </p>

        <div className="mt-8">
          <h3 className="text-2xl font-bold text-center mb-4">Leave a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div className="flex items-center justify-center">
              <label className="mr-4 font-medium">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="bg-gray-700 text-white py-2 px-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review..."
              className="w-full bg-gray-700 text-white p-4 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500"
              rows="4"
            ></textarea>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white py-2 px-8 rounded-full shadow-lg transition-all duration-300"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;
