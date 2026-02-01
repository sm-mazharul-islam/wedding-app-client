// import React, { useState } from "react";
// import sectionImage2 from "../../../Images/section-title2.png";
// import Service from "./Service";
// import service1 from "../../../Images/service01.jpg";
// import { useQuery } from "@tanstack/react-query";

// const Services = () => {
//   const [service, setService] = useState(null);

//   //  const {data:servicesOptions = []} = useQuery({
//   //   queryKey:['servicesPackage'],
//   //   queryFn: async() =>{
//   //      const res = await fetch('http://localhost:5000/servicesPackage');
//   //      const data = await res.json();
//   //      return data
//   //   }
//   //  })

//   const servicesOptions = [
//     {
//       _id: "1",
//       name: "BASIC PACKAGE",
//       nameTwo: "Golden PacKage",
//       price: "250",
//       priceOne: "3500",
//       description:
//         "Stylish makeup for bride.Top label arrengement Amazing meal & breakfast Manicure & Pedicure Full body Polish",
//       descriptionTwo:
//         "Booking and liaising with Venice Registry Office Information and assistance with documents Interpreter for the ceremony Bouquet and buttonhole Gondola or watertaxi from Palazzo Cavalli to St. Mark’s square Photographer (2 hours) Welcome meeting upon your arrival 4 hours assistance on wedding day Unlimited emails and skype calls to define every detail",
//       image: "https://i.ibb.co/FmPBRPT/1.jpg",
//       headerImage:
//         "https://i.ibb.co/L9t86zS/pexels-asad-photo-maldives-1268877.jpg",
//     },
//     {
//       _id: "2",
//       name: "STANDARD PACKAGE",
//       nameTwo: "Diamond Package",
//       price: "250",
//       priceOne: "4500",
//       description:
//         "Stylish makeup for bride.Top label arrengement Amazing meal &    breakfast Manicure & Pedicure Full body Polish",
//       descriptionTwo:
//         "Booking of church  Liaise with priest and religious authorities Ceremony planning Information about documents Interpreter for the ceremony Music for the ceremony Bouquet and buttonhole Photographer (2 hours) Watertaxi from church to St. Mark’s Square Welcome meeting upon your arrival 4 hours assistance on wedding day Unlimited emails and skype calls to define every detail",
//       image: "https://i.ibb.co/C5jwgsL/2.jpg",
//       headerImage:
//         "https://i.ibb.co/FxryvZx/pexels-asad-photo-maldives-169191.jpg",
//     },
//     {
//       _id: "3",
//       name: "LUXARY PACKAGE",
//       nameTwo: "Platinium Package",
//       price: "250",
//       priceOne: "5500",
//       description:
//         "Stylish makeup for bride.Top label arrengement Amazing meal & breakfast  Manicure & Pedicure Full body Polish",
//       descriptionTwo:
//         "Booking and liaising with ceremony venue Officiant Planning of ceremony Information about documents Interpreter for the ceremony Music for the ceremony Symbolic Wedding certificate with embossed Venetian paper folder Bouquet and buttonhole Photographer (2 hours) Watertaxi from ceremony venue to St. Mark’s Square Welcome meeting upon your arrival 4 hours assistance on wedding day Unlimited emails and skype calls to define every detail",
//       image: "https://i.ibb.co/ZXsnc3k/3.jpg",
//       headerImage: "https://i.ibb.co/pn8NFxM/pexels-pixabay-414660.jpg",
//     },
//   ];

//   return (
//     <div>
//       <div
//         className="mt-16 "
//         style={{
//           background: `url(${service1})`,
//           backgroundSize: "cover",
//           marginBottom: "50px",
//           paddingTop: "150px",
//         }}
//       >
//         <img
//           style={{
//             display: "block",
//             marginLeft: "auto",
//             marginRight: "auto",
//             width: "70px",
//             marginBottom: "-25px",
//             marginTop: "10px",
//           }}
//           src={sectionImage2}
//           alt=""
//         />

//         <h2
//           style={{
//             fontFamily: `'Montserrat', sans-serif`,
//           }}
//           className="text-center text-[40px] leading-13  text-white  "
//         >
//           Our Perfect Pricing Plan
//         </h2>
//         <div className="flex flex-col w-[30%]  h-20 m-[auto] pb-64  ">
//           <div
//             style={{ backgroundColor: "white" }}
//             className="divider mt-[-1px]"
//           ></div>
//           <div
//             style={{ backgroundColor: "white" }}
//             className="divider mt-[-10px] w-[70%] m-[auto]"
//           ></div>
//         </div>
//       </div>
//       <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto -mt-64">
//         {servicesOptions.map((service) => (
//           <Service key={service.id} service={service}></Service>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Services;
//!

import React from "react";
import sectionImage2 from "../../../Images/section-title2.png";
import Service from "./Service";
import service1 from "../../../Images/service01.jpg";
import { useQuery } from "@tanstack/react-query";

const Services = () => {
  // 1. Using useQuery to fetch data from the backend
  const {
    data: servicesOptions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/servicesPackage");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  // 2. Handling Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 3. Handling Error State
  if (error) {
    return (
      <div className="text-center text-error py-10">Error: {error.message}</div>
    );
  }

  return (
    <div>
      <div
        className="mt-16"
        style={{
          background: `url(${service1})`,
          backgroundSize: "cover",
          marginBottom: "50px",
          paddingTop: "150px",
        }}
      >
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70px",
            marginBottom: "-25px",
            marginTop: "10px",
          }}
          src={sectionImage2}
          alt=""
        />

        <h2
          style={{
            fontFamily: `'Montserrat', sans-serif`,
          }}
          className="text-center text-[40px] leading-13 text-white"
        >
          Our Perfect Pricing Plan
        </h2>
        <div className="flex flex-col w-[30%] h-20 m-[auto] pb-64">
          <div
            style={{ backgroundColor: "white" }}
            className="divider mt-[-1px]"
          ></div>
          <div
            style={{ backgroundColor: "white" }}
            className="divider mt-[-10px] w-[70%] m-[auto]"
          ></div>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto -mt-64">
        {/* 4. Rendering dynamic data from backend */}
        {servicesOptions.map((serviceItem) => (
          <Service key={serviceItem._id} service={serviceItem}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
