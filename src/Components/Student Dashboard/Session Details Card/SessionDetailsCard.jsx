import React, { useEffect, useState } from "react"; 
import ReactStars from "react-rating-stars-component"; 
import useAxiosUser from "../../../Hooks/useAxiosUser"; 
import { useQuery } from "@tanstack/react-query"; 
import { useNavigate, useParams } from "react-router-dom"; 
import Swal from "sweetalert2";
import LoadingSpinner from "../../../Common/Spinner/LoadingSpinner";

const SessionDetailsCard = () => { 
  const axiosUser = useAxiosUser(); 
  const [session, setSession] = useState(null); 
  const [reviews, setReviews] = useState([]);
  const { id: sessionId } = useParams();
  const navigate = useNavigate();


 
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['sessionDetails', sessionId],
    queryFn: async () => {
      const res = await axiosUser.get(`/sessions/${sessionId}`);
      return res.data;
    },

  });

  
  
  useEffect(() => {
    if (data) {
      setSession(data.sessionDetails);
      setReviews(data.reviews || []);
    }
  }, [data]);

  useEffect(() => {
    if (sessionId) {
      refetch();
    }
  }, [sessionId, refetch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  
  const handleBookNow = async() => {
   if(session.registrationFee == 0){
    
    try{
        const res = await axiosUser.post(`/postData/${sessionId}`)
        const data = await res.data;

        if(data.insertedId){
            Swal.fire({
                title: "Good job!",
                text: "Session Booked Successfully!",
                icon: "success"
              });
        }
    }
    catch(error){console.log(error)}
   }else{

       navigate('/dashboard/payment', {state: {sessionId}})
   }
  };


  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if (isError) return <div className="text-center text-red-600">Error: {error.message}</div>;

  return (
    <div className="max-w-4xl mx-auto my-6 p-8 bg-white shadow-lg rounded-lg">

      <div className="flex justify-center">
        <img className="rounded-lg shadow-lg w-2/3" src={session?.image} alt={session?.title} />
      </div>
      <h1 className="text-4xl font-semibold text-gray-900 text-center mt-6">{session?.title}</h1>
      <p className="text-xl text-gray-600 mt-4 text-center">
        <strong>Tutor:</strong> {session?.tutorName}
      </p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="text-lg text-gray-700">
          <p><strong>Description:</strong> {session?.description}</p>
          <p><strong>Registration Start:</strong> {formatDate(session?.registrationStartDate)}</p>
          <p><strong>Registration End:</strong> {formatDate(session?.registrationEndDate)}</p>
          <p><strong>Class Start:</strong> {formatDate(session?.classStartDate)}</p>
          <p><strong>Class End:</strong> {formatDate(session?.classEndDate)}</p>
          <p><strong>Session Duration:</strong> {session?.duration} hours</p>
          <p><strong>Registration Fee:</strong> ${session?.registrationFee}</p>
        </div>

        <div className="text-lg text-gray-700">
          <h3 className="text-xl font-semibold text-gray-800">Session Status</h3>
          <p className="mt-4">
            <strong>Status:</strong>
            <span className="font-bold text-blue-500">{session?.status}</span>
          </p>
          <div className="mt-6">
            <button onClick={handleBookNow} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
        <div className="max-h-96 overflow-y-auto mt-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="mt-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <img className="w-10 h-10 rounded-full" src={review?.photoURL} alt={review.studentName} />
                  <p className="font-semibold text-gray-900">{review.studentName}</p>
                </div>
                <p className="text-gray-700 mt-2"><strong>Review:</strong> {review.review}</p>
                <div className="flex items-center mt-2">
                  <strong>Rating:</strong>
                  <ReactStars count={5} value={review.rating} edit={false} size={24} activeColor="#ffd700" className="ml-2" />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 mt-2">No reviews yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailsCard;
