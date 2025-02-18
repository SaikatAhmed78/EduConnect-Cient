import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/banner/CollaborativeLearning.png';
import img2 from '../../assets/banner/city-committed-education-collage-concept.jpg';
import img3 from '../../assets/banner/book-with-green-board-background.jpg';

const Banner = () => {
    return (
        <div className="banner-container relative overflow-hidden">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                transitionTime={800}  // Increased transition time for smoother effect
                className="carousel-container"
            >
                {[img1, img2, img3].map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="object-cover h-[550px] w-full transition-all duration-1000 ease-in-out transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-shadow-xl">
                                {index === 0 && "Welcome to Our Collaborative Study Platform"}
                                {index === 1 && "Empowering Education Through Technology"}
                                {index === 2 && "Join Our Learning Community"}
                            </h3>
                            <p className="mt-4 text-lg md:text-xl lg:text-2xl opacity-80">
                                {index === 0 && "Connecting students, tutors, and administrators seamlessly"}
                                {index === 1 && "Innovating learning experiences for everyone"}
                                {index === 2 && "Supporting dynamic educational needs"}
                            </p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
