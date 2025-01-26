// ViewBookedSessions.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewBookedSessions = () => {
    const [session, setSession] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(5);
    const { sessionId } = useParams();

    useEffect(() => {
        axios.get(`/sessions/${sessionId}`).then(response => {
            setSession(response.data);
        });
        axios.get(`/reviews/${sessionId}`).then(response => {
            setReviews(response.data);
        });
    }, [sessionId]);

    const handleReviewSubmit = () => {
        axios.post(`/reviews`, { sessionId, review, rating }).then(response => {
            setReviews([...reviews, response.data]);
        });
    };

    return (
        <div className="container">
            {session && (
                <div className="session-details">
                    <h2>{session.title}</h2>
                    <p>{session.description}</p>
                    <button onClick={() => handleReviewSubmit()}>Submit Review</button>
                </div>
            )}
            <div className="reviews">
                <h3>Reviews:</h3>
                {reviews?.map((review, index) => (
                    <div key={index} className="review-card">
                        <p>{review.review}</p>
                        <span>Rating: {review.rating}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ViewBookedSessions;
