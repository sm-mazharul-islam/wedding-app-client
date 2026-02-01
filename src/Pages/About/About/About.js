// import React from "react";
// import example from "../../../Images/aboutbanner.jpg";
// import TeamMembers from "../TeamMember/TeamMembers";
// import bg from "../../../Images/bg1-1.jpg";

// const About = () => {
//   return (
//     <div className=" bg-base-100">
//       {/* <div>
//         <img className="h-[350px] w-[100%]" src={example} alt="" />
//       </div> */}

//       <div
//         style={{
//           background: `url(${bg})`,
//         }}
//         className="h-[790px] w-[100%] grid grid-cols-2   text-justify gap-2   "
//       >
//         <div className="">
//           <p className="text-4xl">
//             We Plan & Design Weddings That Capture the Imagination
//           </p>
//           <img
//             src="https://lovestory.themerex.net/wp-content/uploads/2016/08/vector-smart-object-copy-12.png"
//             alt=""
//           />
//           <p>
//             Weddings are significant events in people’s lives and as such,
//             couples are often willing to spend considerable amount of money to
//             ensure that their weddings are well-organized. Wedding planners are
//             often used by couples who work long hours and have little spare time
//             available for sourcing and managing wedding venues.
//           </p>
//         </div>
//         <div></div>
//       </div>

//       <TeamMembers />
//     </div>
//   );
// };

// export default About;
//!

import React from "react";
import TeamMembers from "../TeamMember/TeamMembers";
import bg from "../../../Images/bg1-1.jpg";
// Assuming you have these or similar images in your project
import example from "../../../Images/aboutbanner.jpg";

const About = () => {
  const flourishImg =
    "https://lovestory.themerex.net/wp-content/uploads/2016/08/vector-smart-object-copy-12.png";

  return (
    <div className="bg-[#FAF7F6]">
      <div
        style={{
          backgroundImage: `linear-gradient(to right, rgba(250, 247, 246, 0.95), rgba(250, 247, 246, 0.7)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="relative min-h-screen w-full flex items-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden"
      >
        {/* Large Decorative Watermark */}
        <div
          className="absolute -right-20 -bottom-20 w-[600px] h-[600px] opacity-[0.05] pointer-events-none bg-no-repeat bg-contain rotate-12"
          style={{ backgroundImage: `url(${flourishImg})` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-block">
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold block mb-4">
                Our Essence
              </span>
              <h2 className="text-5xl md:text-6xl font-serif text-gray-900 leading-tight">
                We Plan & Design Weddings That{" "}
                <span className="italic">Capture the Imagination</span>
              </h2>
            </div>

            <img
              src={flourishImg}
              alt="decoration"
              className="w-32 opacity-80"
            />

            <div className="max-w-lg space-y-6">
              <p className="text-gray-600 leading-relaxed text-lg font-light italic">
                Weddings are significant events in people’s lives. We ensure
                your celebration is well-organized, turning dreams into a
                breathtaking reality.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We take the weight off your shoulders, managing every sourcing
                and venue detail so you can focus on the love that brought you
                here.
              </p>
            </div>

            <button className="px-10 py-4 border border-gray-900 text-[10px] uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-500">
              Discover Our Process
            </button>
          </div>

          {/* Right Content: Animated Image Composition */}
          <div className="relative order-1 lg:order-2 flex justify-center items-center">
            {/* Main Image Frame */}
            <div className="relative w-full max-w-md aspect-[3/4] rounded-t-full overflow-hidden border-[12px] border-white shadow-2xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800"
                alt="Wedding Decor"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -bottom-10 -left-10 w-48 h-64 border-[8px] border-white shadow-2xl hidden md:block animate-float-delayed">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
                alt="Couple"
                className="w-full h-full object-cover "
              />
            </div>

            {/* Floating Decorative Icon */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <img src={flourishImg} className="w-10 opacity-40" alt="" />
            </div>
          </div>
        </div>
      </div>

      <TeamMembers />

      {/* Tailwind Custom Animations for your global CSS or Tailwind config */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes float-delayed {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
  );
};

export default About;
