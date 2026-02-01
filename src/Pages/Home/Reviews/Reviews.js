// import React from "react";
// import Review from "./Review";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// // import required modules
// import { Autoplay, Pagination, Navigation } from "swiper";

// import "./Review.css";

// const Reviews = () => {
//   const clientReview = [
//     {
//       id: 1,
//       name: "anna mary",
//       image: "https://i.ibb.co/NTDwNc7/image.webp",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
//       star: 4,
//     },
//     {
//       id: 2,
//       name: "anna mary",
//       image: "https://i.ibb.co/k0H9YmN/image11.webp",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
//       star: 4,
//     },
//     {
//       id: 3,
//       name: "anna mary",
//       image: "https://i.ibb.co/7Y6zJNw/image22.webp",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
//       star: 4,
//     },
//     {
//       id: 4,
//       name: "anna mary",
//       image: "https://i.ibb.co/NTDwNc7/image.webp",
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat hic nobis quo quos totam debitis officiis animi nostrum voluptatem eos!",
//       star: 4,
//     },
//   ];

//   return (
//     <div>
//       <img
//         style={{
//           display: "block",
//           marginLeft: "auto",
//           marginRight: "auto",
//           width: "70px",
//           marginBottom: "-55px",
//           marginTop: "10px",
//         }}
//         src="https://i.ibb.co/PGSXyL3/section-title-1.png"
//         alt=""
//       />
//       <h2 className="text-3xl text-center mt-8">What Our Client Says</h2>
//       <div className="divider w-[30%] mx-auto "></div>
//       <div className="divider w-[20%] mx-auto -mt-[20px]"></div>
//       <Swiper
//         loop={true}
//         pagination={{ clickable: true }}
//         slidesPerView={2}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           640: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           1024: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//         }}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         spaceBetween={10}
//         // onSwiper={setSwiperRef}

//         centeredSlides={false}
//         navigation={false}
//         modules={[Autoplay, Pagination, Navigation]}
//         className="mySwiper max-w-[1440px] mx-auto mt-20 "
//       >
//         <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 max-w-[1440px] mx-auto mt-28">
//           {clientReview.map((review) => (
//             <SwiperSlide className="swiper-slide1">
//               <Review key={review.id} review={review}></Review>
//             </SwiperSlide>
//           ))}
//         </div>
//       </Swiper>
//     </div>
//   );
// };

// export default Reviews;
//!

import React, { useEffect, useState } from "react";
import Review from "./Review";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import "./Review.css";

const Reviews = () => {
  // 1. Initialize state for reviews
  const [clientReviews, setClientReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setClientReviews(data);
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

      {/* 4. Only render Swiper if we have reviews */}
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
        <p className="text-center mt-10">No reviews found.</p>
      )}
    </div>
  );
};

export default Reviews;
