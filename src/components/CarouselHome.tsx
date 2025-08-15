import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider, { type CustomArrowProps } from "react-slick";
import React from "react";

const PrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronLeft className="w-5 h-5" />
    </div>
  );
};

const NextArrow: React.FC<CustomArrowProps> = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-200 z-10`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <ChevronRight className="w-5 h-5" />
    </div>
  );
};

const CarouselHome = () => {
  const carouselImages = [
    "/images/carousel/01.jpg",
    "/images/carousel/02.jpg",
    "/images/carousel/03.jpg",
    "/images/carousel/04.jpg",
    "/images/carousel/05.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="w-full">
      <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] xl:h-[70vh]">
        <Slider {...settings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="h-full w-full">
              <div className="h-full w-full overflow-hidden rounded-none">
                <img
                  src={image}
                  alt={`Carousel ${index + 1}`}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselHome;
