import React from "react";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import "./Review.css";

const Reviews = () => {
  const clientReview = [
    {
      id: 1,
      name: "anna mary",
      image: "https://i.ibb.co/NTDwNc7/image.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
      star: 4,
    },
    {
      id: 2,
      name: "anna mary",
      image: "https://i.ibb.co/k0H9YmN/image11.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
      star: 4,
    },
    {
      id: 3,
      name: "anna mary",
      image: "https://i.ibb.co/7Y6zJNw/image22.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
      star: 4,
    },
    {
      id: 4,
      name: "anna mary",
      image: "https://i.ibb.co/NTDwNc7/image.webp",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
      star: 4,
    },
  ];

  return (
    <div>
      <img
        style={{
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          width: "70px",
          marginBottom: "-55px",
          marginTop: "10px",
        }}
        src="https://i.ibb.co/PGSXyL3/section-title-1.png"
        alt=""
      />
      <h2 className="text-3xl text-center mt-8">What Our Client Says</h2>
      <div className="divider w-[30%] mx-auto "></div>
      <div className="divider w-[20%] mx-auto -mt-[20px]"></div>
      <Swiper
        loop={true}
        pagination={{ clickable: true }}
        slidesPerView={2}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        // onSwiper={setSwiperRef}

        centeredSlides={false}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper max-w-[1440px] mx-auto mt-20 "
      >
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1440px] mx-auto mt-28">
          {clientReview.map((review) => (
            <SwiperSlide className="swiper-slide1">
              <Review key={review.id} review={review}></Review>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Reviews;
