import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const reviewsData = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Student',
    review: 'This platform has transformed my learning experience. The resources and sessions are top-notch!',
    rating: 5,
    date: 'Feb 10, 2025'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Tutor',
    review: 'Managing sessions has never been easier. I love the performance tracking feature!',
    rating: 4,
    date: 'Jan 25, 2025'
  },
  {
    id: 3,
    name: 'Alex Johnson',
    role: 'Student',
    review: 'The session booking system is seamless, and the interface is very user-friendly.',
    rating: 5,
    date: 'March 5, 2025'
  }
];

const ReviewCard = ({ review }) => {
  return (
    <div className="shadow-xl rounded-3xl p-6 text-center flex flex-col items-center border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
      <div className="w-16 h-16 flex items-center justify-center bg-cyan-500 dark:bg-cyan-700 rounded-full text-white text-2xl font-bold mb-4">
        {review.name.charAt(0)}
      </div>
      <h3 className="text-2xl font-bold mb-2 text-cyan-700 dark:text-cyan-400">{review.name}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{review.role}</p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{review.date}</p>
      <p className="text-gray-800 dark:text-gray-300 italic mb-4">"{review.review}"</p>
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
    <section className="w-11/12 mx-auto mt-10 py-12">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-cyan-700 dark:text-cyan-400">What Our Users Say</h2>
      <Carousel 
        showArrows={true} 
        autoPlay={true} 
        infiniteLoop={true} 
        showThumbs={false} 
        showStatus={false} 
        interval={4000} 
        transitionTime={600} 
        className="text-gray-900 dark:text-white px-6"

     
      >
        {reviewsData.map((review) => (
          <div key={review.id} className="px-4">
            <ReviewCard review={review} />
          </div>
        ))}
      </Carousel>
    </section>
  );
};

export default ReviewsSection;
