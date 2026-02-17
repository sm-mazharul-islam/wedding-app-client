import React, { useEffect, useState } from "react";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import "./Review.css";
import BASE_URL from "../../../config";

const Reviews = () => {
  // 1. Initialize state for reviews
  const [clientReviews, setClientReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from the backend
  useEffect(() => {
    fetch(`${BASE_URL}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        // --- ফাংশনালিটি পরিবর্তন: শুধুমাত্র পিন করা রিভিউ ফিল্টার করা হচ্ছে ---
        const pinnedReviews = data.filter((review) => review.isPinned === true);
        setClientReviews(pinnedReviews);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  // 3. Optional Loading State
  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-bold">
        Loading Reviews...
      </div>
    );
  }

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

      {/* 4. Only render Swiper if we have pinned reviews */}
      {clientReviews.length > 0 ? (
        <Swiper
          loop={clientReviews.length > 2} // Loop only works well with enough slides
          pagination={{ clickable: true }}
          slidesPerView={2}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 2, spaceBetween: 10 },
            1024: { slidesPerView: 2, spaceBetween: 10 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          spaceBetween={10}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper max-w-[1440px] mx-auto mt-20"
        >
          {clientReviews.map((review) => (
            <SwiperSlide className="swiper-slide1" key={review._id}>
              <Review review={review}></Review>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center mt-10">No featured reviews found.</p>
      )}
    </div>
  );
};

export default Reviews;
