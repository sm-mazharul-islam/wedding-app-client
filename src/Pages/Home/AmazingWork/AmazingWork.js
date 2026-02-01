// //!
import React from "react";

const AmazingWork = () => {
  // Curated Luxury Demo Data
  const workData = [
    {
      id: 1,
      title: "The Alabaster Gala",
      category: "Luxury Ballroom",
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=800&auto=format&fit=crop",
      span: "lg:col-span-2 lg:row-span-2",
    },
    {
      id: 2,
      title: "Ethereal Garden Vows",
      category: "Outdoor Floral",
      image:
        "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=800&auto=format&fit=crop",
      span: "lg:col-span-1 lg:row-span-1",
    },
    {
      id: 3,
      title: "Golden Hour Soirée",
      category: "Sunset Reception",
      image:
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=800&auto=format&fit=crop",
      span: "lg:col-span-1 lg:row-span-1",
    },
  ];

  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      {/* DESIGNED BACKGROUND SHAPE:
        Top side remains your signature "W" wave.
        Bottom side now curves into a "Love/Heart" shape.
      */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1440 1000"
          className="w-full h-full preserve-3d"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            /* TOP: Remains your original wave (M0 150C300 50...1440 150)
               BOTTOM: Changed from straight (V1000H0) to a Heart curve (V850 C1200 1050 850 1050 720 1000 C590 1050 240 1050 0 850)
            */
            d="M0 150C300 50 450 350 720 200C990 50 1140 350 1440 150V850C1200 1050 850 1050 720 1000C590 1050 240 1050 0 850V150Z"
            fill="#FAF7F6"
            className="transition-all duration-1000 ease-in-out"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] uppercase tracking-[0.6em] text-gray-400 mb-4">
            The WP Portfolio
          </p>
          <h2 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
            Our <span className="italic font-light">Signature</span> Work
          </h2>
          <div className="w-16 h-px bg-gray-200 mx-auto mt-8"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-[1px] bg-gray-400"></span>
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-500 font-medium">
                  Our Portfolio
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-gray-900 leading-tight">
                Capturing{" "}
                <span className="italic font-light text-gray-700">Eternal</span>{" "}
                <br />
                Love Stories
              </h2>
            </div>
            <div className="pb-2">
              <button className="group relative text-[11px] uppercase tracking-[0.3em] text-gray-900 font-semibold transition-all">
                View All Weddings
                <span className="block h-[1px] bg-gray-900 w-full scale-x-100 group-hover:scale-x-50 transition-transform duration-500 mt-1"></span>
              </button>
            </div>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[350px]">
          {workData.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden bg-white shadow-xl shadow-gray-200/40 ${item.span}`}
            >
              {/* Image with high-end slow zoom */}
              <img
                className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
                src={item.image}
                alt={item.title}
              />

              {/* Hover Content Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[1px] flex flex-col justify-end p-10">
                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-white/80 text-[10px] uppercase tracking-[0.4em] mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-white text-3xl font-serif italic mb-4">
                    {item.title}
                  </h3>
                  <div className="w-12 h-[1px] bg-white opacity-50"></div>
                </div>
              </div>

              {/* Sophisticated Thin Border on Hover */}
              <div className="absolute inset-6 border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Footer Branding Subtitle sitting in the heart dip */}
        <div className="mt-32 text-center">
          <p className="text-[11px] text-gray-400 uppercase tracking-[0.8em]">
            Every Detail Matters
          </p>
        </div>
      </div>
    </section>
  );
};

export default AmazingWork;
