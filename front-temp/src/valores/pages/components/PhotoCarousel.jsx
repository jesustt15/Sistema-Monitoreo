/* eslint-disable react/prop-types */

import  { useState } from 'react';


export const PhotoCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel">
            <div className="carousel-content">
                {images.map((img, index) => (
                    <div
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                        key={index}
                    >
                        {index === currentIndex && (
                            <img src={img} alt={`Slide ${index}`} />
                        )}
                        {index === currentIndex && (
                            <>
                                <button className="prev" onClick={prevSlide}>❮</button>
                                <button className="next" onClick={nextSlide}>❯</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};





