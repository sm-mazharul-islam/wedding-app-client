import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper";

// Import your assets
import icon0 from "../../../Images/icon.png";
import shape7 from "../../../Images/shape7.png";
import shape8 from "../../../Images/shape8.png";

// Swiper Styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Banner.css"; // See the CSS below for the zoom effect
import { Link } from "react-router-dom";

export default function Banner() {
  const slides = [
    {
      id: 1,
      image: "https://i.ibb.co/XjV7CbG/16487947022-411f1d78de-o.jpg",
      title: "Making Memories That Last Forever",
      subtitle: "Welcome to Wedding Planner",
    },
    {
      id: 2,
      image: "https://i.ibb.co/qdt8D6h/pexels-emma-bauso-2253867.jpg",
      title: "Your Dream Wedding, Perfectly Planned",
      subtitle: "Exclusive Wedding Design",
    },
    {
      id: 3,
      image: "https://i.ibb.co/yVWH6JZ/pexels-fadime-erbass-8677515.jpg",
      title: "Love is in the Details",
      subtitle: "Elegant & Intimate Events",
    },
    {
      id: 3,
      image: "https://i.ibb.co.com/KcQJM5SW/pexels-rishe-clicks-12160106.jpg",
      title: "Crafting Moments That Last Forever",
      subtitle: "Refined  Romantic  Remarkable",
    },
  ];

  return (
    <section className="h-[80vh] md:h-screen w-full overflow-hidden">
      <Swiper
        effect={"fade"}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative overflow-hidden">
            {/* Background Image with Zoom Effect */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear scale-100 swiper-slide-active:scale-110"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Subtle Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex h-full items-center justify-center px-6">
              <div className="max-w-4xl text-center text-white">
                {/* Decorative Shape Header */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <img
                    src={shape7}
                    alt=""
                    className="w-12 md:w-24 opacity-80"
                  />
                  <p className="text-xs md:text-sm uppercase tracking-[0.6em] font-medium drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <img
                    src={shape8}
                    alt=""
                    className="w-12 md:w-24 opacity-80"
                  />
                </div>

                {/* Main Title */}
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif italic leading-tight drop-shadow-lg mb-10">
                  {slide.title}
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                  <button className="px-10 py-4 bg-white text-gray-900 text-[10px] uppercase tracking-widest font-bold hover:bg-[#FAF7F6] transition-colors duration-300">
                    Plan Your Event
                  </button>
                  <Link to={"gallery"}>
                    <button className="px-10 py-4 border border-white text-white text-[10px] uppercase tracking-widest font-bold hover:bg-white hover:text-black transition-all duration-300">
                      Our Gallery
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Corner Icon Decor */}
            <img
              src={icon0}
              alt=""
              className="absolute bottom-10 right-10 w-20 md:w-32 opacity-20 pointer-events-none"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
