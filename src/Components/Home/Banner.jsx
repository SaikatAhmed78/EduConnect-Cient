import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/banner/book-with-green-board-background.jpg';
import img2 from '../../assets/banner/freepik__the-style-is-candid-image-photography-with-natural__3482.jpeg';
import img3 from '../../assets/banner/freepik__the-style-is-candid-image-photography-with-natural__3485.jpeg';
import img4 from '../../assets/banner/learning-education-ideas-insight-intelligence-study-concept.jpg';
import img5 from '../../assets/banner/still-life-books-versus-technology.jpg';

const Banner = () => {
    return (
        <div className="banner-container relative overflow-hidden">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                transitionTime={800}
                className="carousel-container"
            >
                {[img1, img2, img3, img4, img5].map((image, index) => (
                    <div key={index} className="relative">
                        <img
                            src={image}
                            alt={`Banner ${index + 1}`}
                            className="object-cover h-[650px] w-full transition-all duration-1000 ease-in-out transform hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white px-6">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-shadow-xl animate-fadeIn">
                                {index === 0 && "Welcome to Our Collaborative Study Platform"}
                                {index === 1 && "Empowering Education Through Technology"}
                                {index === 2 && "Join Our Learning Community"}
                                {index === 3 && "Innovative Learning Approaches"}
                                {index === 4 && "Shape Your Future with Us"}
                            </h3>
                            <p className="mt-4 text-lg md:text-xl lg:text-2xl opacity-90 animate-slideUp">
                                {index === 0 && "Connecting students, tutors, and administrators seamlessly"}
                                {index === 1 && "Innovating learning experiences for everyone"}
                                {index === 2 && "Supporting dynamic educational needs"}
                                {index === 3 && "Exploring new learning frontiers together"}
                                {index === 4 && "Unlocking new possibilities for your future"}
                            </p>
                            <button className="mt-6 bg-cyan-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-cyan-600 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
