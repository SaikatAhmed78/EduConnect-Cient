import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

import img1 from '../../assets/banner/CollaborativeLearning.png';
import img2 from '../../assets/banner/city-committed-education-collage-concept.jpg';
import img3 from '../../assets/banner/book-with-green-board-background.jpg';

const Banner = () => {
    return (
        <div className="banner-container relative">
            <Carousel
                showThumbs={false}
                autoPlay
                infiniteLoop
                interval={3000}
                className="carousel-container"
            >
                {[img1, img2, img3].map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt={`Banner ${index + 1}`} className="object-cover h-[550px] w-full" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black bg-opacity-60 flex flex-col items-center justify-center text-center text-white px-6">
                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
                                {index === 0 && "Welcome to Our Collaborative Study Platform"}

                                {index === 2 && "Join Our Learning Community"}
                            </h3>
                            <p className="mt-2 text-base md:text-lg lg:text-xl">
                                {index === 0 && "Connecting students, tutors, and administrators seamlessly"}

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
