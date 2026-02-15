import React, { useState, useMemo } from "react";

const demoData = [
  {
    id: 1,
    title: "The Grand Ballroom",
    category: "Venues",
    location: "Paris",
    img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000",
  },
  {
    id: 2,
    title: "Ethereal Florals",
    category: "Decor",
    location: "London",
    img: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1000",
  },
  {
    id: 3,
    title: "Golden Hour Vows",
    category: "Ceremony",
    location: "Tuscany",
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000",
  },
  {
    id: 4,
    title: "The Silk Gown",
    category: "Bridal",
    location: "Milan",
    img: "https://images.unsplash.com/photo-1546193430-c2d207739ed7?auto=format&fit=crop&w=1000",
  },
  {
    id: 5,
    title: "Vintage Tablescape",
    category: "Decor",
    location: "Provence",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1000",
  },
  {
    id: 6,
    title: "Chateau Reception",
    category: "Venues",
    location: "Loire Valley",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000",
  },

  {
    id: 7,
    title: "Midnight Banquet",
    category: "Venues",
    location: "Rome",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000",
  },
  {
    id: 8,
    title: "Wildflower Arch",
    category: "Decor",
    location: "Cotswolds",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000",
  },
  {
    id: 9,
    title: "The First Dance",
    category: "Ceremony",
    location: "Venice",
    img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000",
  },
  // {
  //   id: 12,
  //   title: "Classic Bouquet",
  //   category: "Decor",
  //   location: "Vienna",
  //   img: "https://images.unsplash.com/photo-1465495910483-0d7589997930?auto=format&fit=crop&w=1000",
  // },
];

const categories = ["All", "Venues", "Decor", "Ceremony", "Bridal"];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = useMemo(() => {
    return activeFilter === "All"
      ? demoData
      : demoData.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 overflow-x-hidden">
      {/* 1. Global Performance Styles */}
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-item { animation: revealUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        .masonry-view { columns: 1; gap: 1.5rem; }
        @media (min-width: 768px) { .masonry-view { columns: 2; gap: 2rem; } }
        @media (min-width: 1024px) { .masonry-view { columns: 3; gap: 2.5rem; } }
      `}</style>

      <section className="max-w-[1440px] mx-auto px-5 sm:px-10 py-16">
        {/* --- LUXURY HERO HEADER --- */}
        <header className="mb-20 text-center">
          <div className="mb-6 overflow-hidden">
            <span className="block text-[9px] tracking-[0.7em] uppercase text-stone-400 font-black reveal-item">
              Curated Legacy
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-[8rem] font-serif italic tracking-tighter text-stone-900 leading-none mb-10">
            Timeless <br className="sm:hidden" />
            <span className="font-sans not-italic font-black text-rose-500 opacity-90">
              Artistry
            </span>
          </h1>

          {/* Responsive Category Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 sm:gap-x-12 gap-y-4 border-y border-stone-200 py-6 sm:py-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] sm:text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-500 relative pb-1 ${
                  activeFilter === cat
                    ? "text-stone-900"
                    : "text-stone-300 hover:text-stone-600"
                }`}
              >
                {cat}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] bg-rose-500 transition-all duration-500 ${activeFilter === cat ? "w-full" : "w-0"}`}
                />
              </button>
            ))}
          </nav>
        </header>

        {/* --- THE GALLERY GRID --- */}
        <div className="masonry-view space-y-6 sm:space-y-10">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="reveal-item break-inside-avoid group relative cursor-pointer overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] bg-white transition-all duration-700 hover:shadow-2xl"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image with Dynamic Grayscale and Zoom */}
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover transition-transform duration-[2s] ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0"
                />
              </div>

              {/* Sophisticated Glass Overlay (Adjusted for Small/Large Screen) */}
              <div className="absolute inset-0 bg-stone-900/60 sm:bg-stone-900/80 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[4px] flex flex-col items-center justify-center p-6 sm:p-12 text-center">
                <span className="text-rose-400 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.5em] mb-3 sm:mb-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                  {item.category}
                </span>

                <h3 className="text-white text-2xl sm:text-4xl font-serif italic mb-2 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {item.title}
                </h3>

                <div className="w-8 sm:w-12 h-[1px] bg-white/30 my-4 sm:my-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150" />

                <div className="flex items-center gap-2 text-white/60 text-[9px] sm:text-[10px] uppercase tracking-[0.3em] translate-y-6 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  {item.location}
                </div>

                {/* Mobile Friendly Action */}
                <div className="mt-8 sm:mt-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                  <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-stone-900 rounded-full font-black uppercase text-[7px] sm:text-[8px] tracking-[0.4em] active:scale-90 transition-all">
                    View Story
                  </button>
                </div>
              </div>

              {/* Minimal ID Display (Mobile visible initially, then hides) */}
              <div className="absolute top-6 right-8 text-[40px] sm:text-[60px] font-serif italic text-stone-100/30 group-hover:opacity-0 transition-opacity duration-500 select-none">
                {String(item.id).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>

        {/* --- MODERN MINIMAL FOOTER --- */}
        <div className="mt-40 text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-stone-200" />
            <span className="text-rose-500 font-serif italic text-xl">
              Love Lives Here
            </span>
            <div className="h-[1px] w-12 bg-stone-200" />
          </div>
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.4em] hover:text-rose-500 transition-colors cursor-pointer">
            Explore More Stories
          </p>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
