import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const reviewsData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Student',
    review: 'This platform has transformed my learning experience. The resources and sessions are top-notch!',
    rating: 5,
    avatar: ''
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Tutor',
    review: 'Managing sessions has never been easier. I love the performance tracking feature!',
    rating: 4,
    avatar: 'https://via.placeholder.com/80'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Student',
    review: 'The session booking system is seamless, and the interface is very user-friendly.',
    rating: 5,
    avatar: 'https://via.placeholder.com/80'
  }
];

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 text-center flex flex-col items-center">
      <img 
        src={review.avatar} 
        alt={review.name} 
        className="w-24 h-24 rounded-full mb-4 border-4 border-gray-300 dark:border-gray-600"
      />
      <h3 className="text-2xl font-bold mb-2">{review.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{review.role}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">"{review.review}"</p>
      <div className="flex justify-center space-x-1">
        {Array.from({ length: review.rating }).map((_, index) => (
          <span key={index} className="text-yellow-500 text-lg">★</span>
        ))}
        {Array.from({ length: 5 - review.rating }).map((_, index) => (
          <span key={index} className="text-gray-300 text-lg">★</span>
        ))}
      </div>
    </div>
  );
};

const ReviewsSection = () => {
  return (
    <section className="w-11/12 mx-auto mt-10 py-10">
      <h2 className="text-4xl font-bold text-center text-cyan-500 mb-10">What Our Users Say</h2>
      <Carousel 
        showArrows={true} 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false} 
        interval={5000} 
        transitionTime={700} 
        className="text-gray-900 dark:text-white"
      >
        {reviewsData.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default ReviewsSection;
