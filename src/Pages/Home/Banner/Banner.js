// // import React from 'react';
// // import background from '../../../Images/Banner_02.jpg'
// // import background1 from '../../../Images/Banner_01.jpg'

// // const Banner = () => {
// //     return (
// // //         <div className="hero min-h-screen" style={{ backgroundImage: `url("https://i.ibb.co/J2w5PSN/Banner-01.jpg")` }}>
// // //         <div className="hero-overlay bg-opacity-60"></div>

// // //   <div className="hero-content flex-col lg:flex-row-reverse">
// // //     <img src={background} style={{width:'100%'}} className="max-w-sm rounded-lg shadow-2xl" />
// // //     <div className='text-white'>
// // //       <h1 className="text-5xl font-bold ">Box Office News!</h1>
// // //       <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
// // //       <button className="btn btn-primary">Get Started</button>
// // //     </div>
// // //     </div>
// // //     </div>

// // <div  className="carousel w-full">
// //   <div  id="slide1"  className=" carousel-item relative w-full ">
// //     <img  src={background1} className="w-full h-[80%] " />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //       <a href="#slide4" className="btn btn-circle">❮</a>
// //       <a href="#slide2" className="btn btn-circle">❯</a>
// //     </div>
// //   </div>
// //   <div id="slide2" className="carousel-item relative w-full">
// //     <img src={background} className="w-full" />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //       <a href="#slide1" className="btn btn-circle">❮</a>
// //       <a href="#slide3" className="btn btn-circle">❯</a>
// //       <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ad voluptatem, illo fugiat modi doloribus incidunt vero porro dolor earum magnam unde provident id facere enim, nulla inventore magni sapiente adipisci repellat cumque ullam. Quasi voluptatum quos, rerum magni tempora aut dolorem molestias? Nemo labore tempore ex, temporibus sed, voluptates, laboriosam quas molestias amet doloribus veniam animi reprehenderit facilis quia. Optio ipsum repudiandae reprehenderit exercitationem, asperiores tempora porro dolor sit officia hic consectetur animi aliquid nesciunt magnam commodi earum quia vero soluta doloremque autem illo molestias minima. Eum, voluptatibus doloremque quo accusamus reiciendis saepe cupiditate animi ducimus magnam accusantium officia.</h4>
// //     </div>
// //   </div>
// //   {/* <div id="slide3" className="carousel-item relative w-full">
// //     <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
// //     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
// //     <a href="#slide2" className="btn btn-circle">❮</a>
// //     <a href="#slide4" className="btn btn-circle">❯</a>
// //     </div>
// //   </div>  */}
// //   </div>

// //     );
// // };

// // export default Banner;

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
// import icon0 from "../../../Images/icon.png";
// import shape7 from "../../../Images/shape7.png";
// import shape8 from "../../../Images/shape8.png";
// // import './Banner.css'

// // Import Swiper styles
// import "./Banner.css";
// import "swiper/css/pagination";

// // import "./styles.css";

// // import required modules
// import { Autoplay, Pagination } from "swiper";

// export default function Banner() {
//   return (
//     <>
//       <Swiper
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//         }}
//         centeredSlides={true}
//         slidesPerView={1}
//         breakpoints={{
//           0: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//           480: {
//             slidesPerView: 2,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 1,
//             spaceBetween: 10,
//           },
//         }}
//         spaceBetween={30}
//         pagination={{
//           clickable: true,
//         }}
//         modules={[Autoplay, Pagination]}
//         className="mySwiper"
//       >
//         <div>
//           <SwiperSlide
//             style={{ background: `url(${icon0})` }}
//             className="mySwiper  card  w-[100%] lg:card-side  rounded-none  "
//           >
//             {/* style={{backgroundImage:`url(https://cloudinary.fifa.com/m/74dcea0f99c7fa98/webimage-Previews-FIFA-World-Cup-Qatar-2022.png?tx=c_fill,ar_0.63,g_auto,q_auto:best,w_628)`, backgroundSize:'cover', backgroundRepeat:'no-repeat',  height: '500px '}} */}

//             <img
//               style={{ width: "100%", height: "750px" }}
//               src="https://i.ibb.co/XjV7CbG/16487947022-411f1d78de-o.jpg"
//               alt=""
//             />
//             <div className=" bg-neutral-300/30  text-black  lg:text-justify   max-sm:mt-[-560px] w-full pt-9">
//               <div className="grid lg:grid-cols-3  ">
//                 <img src={shape7} style={{ width: "100%" }} alt="" />
//                 <p className="text-center text-xl ">
//                   {" "}
//                   Welcome To wedding planner
//                 </p>
//                 <img src={shape8} style={{ width: "100%" }} alt="" />
//               </div>
//               <p className="text-3xl mt-9 mb-14 text-center">
//                 Making Memory That Last Forever
//               </p>
//             </div>
//           </SwiperSlide>

//           {/* <SwiperSlide className="swiper-slide card w-[100%] lg:card-side bg-base-100 shadow-xl rounded-none "  >
//         <img style={{width:'100%', height:'750px'}} src="https://i.ibb.co/qdt8D6h/pexels-emma-bauso-2253867.jpg" alt="" />
//       <p className="text-black text-3xl lg:text-justify m-20  max-sm:mt-[-660px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod asperiores est necessitatibus praesentium provident. Omnis obcaecati consequatur veniam nemo corporis vitae itaque! Possimus aut laborum in repellendus, porro commodi voluptatem!</p>

//         </SwiperSlide>

//         <SwiperSlide className="swiper-slide card w-[100%] lg:card-side bg-base-100 shadow-xl rounded-none ">
//         <img style={{width:'100%', height:'750px'}} src="https://i.ibb.co/yVWH6JZ/pexels-fadime-erbass-8677515.jpg" alt="" />
//         <p className="text-black text-3xl lg:text-justify m-20  max-sm:mt-[-660px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia eaque maxime in fugiat atque voluptatibus aliquid necessitatibus delectus soluta hic.</p>

//         </SwiperSlide> */}
//         </div>

//         {/* https://i.ibb.co/R7RcsZ2/pexels-melike-benli-11338231.jpg */}
//       </Swiper>
//     </>
//   );
// }
//!
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
