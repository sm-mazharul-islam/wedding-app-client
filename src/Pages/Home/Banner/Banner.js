// import React from 'react';
// import background from '../../../Images/Banner_02.jpg'
// import background1 from '../../../Images/Banner_01.jpg'

// const Banner = () => {
//     return (
// //         <div className="hero min-h-screen" style={{ backgroundImage: `url("https://i.ibb.co/J2w5PSN/Banner-01.jpg")` }}>
// //         <div className="hero-overlay bg-opacity-60"></div>
       
// //   <div className="hero-content flex-col lg:flex-row-reverse">
// //     <img src={background} style={{width:'100%'}} className="max-w-sm rounded-lg shadow-2xl" />
// //     <div className='text-white'>
// //       <h1 className="text-5xl font-bold ">Box Office News!</h1>
// //       <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
// //       <button className="btn btn-primary">Get Started</button>
// //     </div>
// //     </div>
// //     </div>
 

// <div  className="carousel w-full">
//   <div  id="slide1"  className=" carousel-item relative w-full ">
//     <img  src={background1} className="w-full h-[80%] " />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide4" className="btn btn-circle">❮</a> 
//       <a href="#slide2" className="btn btn-circle">❯</a>
//     </div>
//   </div> 
//   <div id="slide2" className="carousel-item relative w-full">
//     <img src={background} className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//       <a href="#slide1" className="btn btn-circle">❮</a> 
//       <a href="#slide3" className="btn btn-circle">❯</a>
//       <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ad voluptatem, illo fugiat modi doloribus incidunt vero porro dolor earum magnam unde provident id facere enim, nulla inventore magni sapiente adipisci repellat cumque ullam. Quasi voluptatum quos, rerum magni tempora aut dolorem molestias? Nemo labore tempore ex, temporibus sed, voluptates, laboriosam quas molestias amet doloribus veniam animi reprehenderit facilis quia. Optio ipsum repudiandae reprehenderit exercitationem, asperiores tempora porro dolor sit officia hic consectetur animi aliquid nesciunt magnam commodi earum quia vero soluta doloremque autem illo molestias minima. Eum, voluptatibus doloremque quo accusamus reiciendis saepe cupiditate animi ducimus magnam accusantium officia.</h4>
//     </div>
//   </div> 
//   {/* <div id="slide3" className="carousel-item relative w-full">
//     <img src="/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
//     <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
//     <a href="#slide2" className="btn btn-circle">❮</a> 
//     <a href="#slide4" className="btn btn-circle">❯</a>
//     </div>
//   </div>  */}
//   </div>






//     );
// };

// export default Banner;





import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import icon0 from '../../../Images/icon.png'
import shape7 from '../../../Images/shape7.png'
import shape8 from '../../../Images/shape8.png'
// import './Banner.css'

// Import Swiper styles
import './Banner.css'
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import {Autoplay,  Pagination } from "swiper";

export default function Banner() {
  return (
    <>
      <Swiper
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      centeredSlides={true}
        slidesPerView={1}
        breakpoints={{
      0: {
slidesPerView: 1,
spaceBetween: 10,

      },
      480: {
slidesPerView:2,
spaceBetween: 10,
      },
      768: {
slidesPerView:1,
spaceBetween: 10,
      }
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay,Pagination]}
        className="mySwiper"
        >
        <div >
        <SwiperSlide  style={{background:`url(${icon0})`}}  className="mySwiper  card  w-[100%] lg:card-side  rounded-none  " >
        {/* style={{backgroundImage:`url(https://cloudinary.fifa.com/m/74dcea0f99c7fa98/webimage-Previews-FIFA-World-Cup-Qatar-2022.png?tx=c_fill,ar_0.63,g_auto,q_auto:best,w_628)`, backgroundSize:'cover', backgroundRepeat:'no-repeat',  height: '500px '}} */}

  
           <img style={{width:'100%', height:'750px'}} src="https://i.ibb.co/XjV7CbG/16487947022-411f1d78de-o.jpg" alt=""  />
         <div className=" bg-neutral-300/30  text-black  lg:text-justify   max-sm:mt-[-560px] w-full pt-9">
          <div className="grid lg:grid-cols-3  " >
         <img src={shape7} style={{width:'100%'}}  alt="" />
         <p className="text-center text-xl "> Welcome To wedding planner</p>
         <img src={shape8} style={{width:'100%'}}  alt="" />
         </div>
           <p className="text-3xl mt-9 mb-14 text-center" >Making Memory That Last Forever</p>
        </div>
        </SwiperSlide>


        {/* <SwiperSlide className="swiper-slide card w-[100%] lg:card-side bg-base-100 shadow-xl rounded-none "  >
        <img style={{width:'100%', height:'750px'}} src="https://i.ibb.co/qdt8D6h/pexels-emma-bauso-2253867.jpg" alt="" />
      <p className="text-black text-3xl lg:text-justify m-20  max-sm:mt-[-660px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod asperiores est necessitatibus praesentium provident. Omnis obcaecati consequatur veniam nemo corporis vitae itaque! Possimus aut laborum in repellendus, porro commodi voluptatem!</p>
        
        
        </SwiperSlide>
        
        <SwiperSlide className="swiper-slide card w-[100%] lg:card-side bg-base-100 shadow-xl rounded-none ">
        <img style={{width:'100%', height:'750px'}} src="https://i.ibb.co/yVWH6JZ/pexels-fadime-erbass-8677515.jpg" alt="" />
        <p className="text-black text-3xl lg:text-justify m-20  max-sm:mt-[-660px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia eaque maxime in fugiat atque voluptatibus aliquid necessitatibus delectus soluta hic.</p>
        
   
        
        </SwiperSlide> */}
        
   </div>
        
     

        {/* https://i.ibb.co/R7RcsZ2/pexels-melike-benli-11338231.jpg */}
       
       
        
       
       
      </Swiper>
    </>
  );
}