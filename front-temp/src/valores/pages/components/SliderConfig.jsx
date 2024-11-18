/* eslint-disable react/prop-types */
// PhotoSlider.js

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const SliderConfig = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="photo-slider">
            <Slider {...settings}>
                {images.map((img, index) => (
                    <div key={index}>
                        <img src={img} alt={`Slide ${index}`} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

