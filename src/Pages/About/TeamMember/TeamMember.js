// import React from "react";
// import { FaFacebook } from "react-icons/fa";
// import { SiTwitter } from "react-icons/si";
// import { BsYoutube } from "react-icons/bs";

// const TeamMember = ({ member }) => {
//   const { name, description, img } = member;
//   return (
//     <div
//       className="card w-80 h-[95%] bg-base-100 shadow-xl "
//       style={{
//         borderRadius: "200px 200px 10px 10px",
//         margin: "10px 10px 10px 2px",
//       }}
//     >
//       <div className=" p-3 ">
//         <figure>
//           <img
//             src={img}
//             alt="Shoes"
//             style={{
//               borderRadius: "200px 200px 10px 10px",
//               width: "450px",
//               height: "300px",
//             }}
//           />
//         </figure>
//         <div className="card-body">
//           <h2
//             className="card-title mx-auto text-2xl"
//             style={{ color: "#432818" }}
//           >
//             {name}
//           </h2>
//           <div
//             className="flex flex-row gap-4 justify-center text-xl m-4  "
//             style={{ color: "#432818" }}
//           >
//             <FaFacebook />
//             <SiTwitter />
//             <BsYoutube />
//           </div>
//           <p className="text-center text-[15px]" style={{ color: "#432818" }}>
//             {description}
//           </p>
//           <div className="card-actions justify-end"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeamMember;
//!
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { SiTwitter } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";

const TeamMember = ({ member }) => {
  const { name, description, img } = member;

  return (
    <div className="group relative">
      {/* Main Card */}
      <div
        className="relative w-80 h-full bg-white shadow-sm transition-all duration-700 ease-in-out 
                   hover:shadow-2xl hover:-translate-y-4 border border-gray-100"
        style={{
          borderRadius: "200px 200px 20px 20px",
          backgroundColor: "#FAF7F6", // Matching your footer/header
        }}
      >
        <div className="p-4">
          {/* Image Container with Zoom Effect */}
          <figure
            className="relative overflow-hidden"
            style={{ borderRadius: "200px 200px 15px 15px" }}
          >
            <img
              src={img}
              alt={name}
              className="w-full h-[320px] object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            {/* Social Overlay on Hover */}
            <div className="absolute inset-0 bg-[#432818]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="flex gap-4 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 text-white text-2xl">
                <FaFacebook className="hover:text-amber-200 cursor-pointer transition-colors" />
                <SiTwitter className="hover:text-amber-200 cursor-pointer transition-colors" />
                <BsYoutube className="hover:text-amber-200 cursor-pointer transition-colors" />
              </div>
            </div>
          </figure>

          {/* Content Area */}
          <div className="card-body px-4 py-8 text-center">
            {/* Name with subtle line animation */}
            <div className="relative inline-block mx-auto mb-2">
              <h2
                className="font-serif text-2xl tracking-wide"
                style={{ color: "#432818" }}
              >
                {name}
              </h2>
              <span className="block h-[1px] bg-amber-800 w-0 group-hover:w-full transition-all duration-700 mx-auto mt-1"></span>
            </div>

            {/* Hidden Socials Reveal (Optional alternative to overlay) */}
            <div className="flex flex-row gap-6 justify-center text-xl mb-4 transition-all duration-500 text-amber-900/40 group-hover:text-amber-900">
              {/* These icons now look elegant even when not hovered */}
            </div>

            <p
              className="text-[14px] leading-relaxed font-light italic"
              style={{ color: "#432818" }}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Decorative Bottom Shape */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-800/20 rounded-full group-hover:w-24 group-hover:bg-amber-800 transition-all duration-700"></div>
      </div>
    </div>
  );
};

export default TeamMember;
