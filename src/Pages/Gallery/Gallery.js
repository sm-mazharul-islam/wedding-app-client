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
    title: "Candid Moments",
    category: "Ceremony",
    location: "New York",
    img: "https://images.unsplash.com/photo-1510076857177-74700760be15?auto=format&fit=crop&w=1000",
  },
  {
    id: 8,
    title: "Lace Details",
    category: "Bridal",
    location: "Madrid",
    img: "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&w=1000",
  },
  {
    id: 9,
    title: "Midnight Banquet",
    category: "Venues",
    location: "Rome",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000",
  },
  {
    id: 10,
    title: "Wildflower Arch",
    category: "Decor",
    location: "Cotswolds",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000",
  },
  {
    id: 11,
    title: "The First Dance",
    category: "Ceremony",
    location: "Venice",
    img: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000",
  },
  {
    id: 12,
    title: "Classic Bouquet",
    category: "Decor",
    location: "Vienna",
    img: "https://images.unsplash.com/photo-1465495910483-0d7589997930?auto=format&fit=crop&w=1000",
  },
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
    <div className="min-h-screen bg-[#FDFBF9] text-[#4A3728] selection:bg-[#743C1D] selection:text-white">
      {/* Top Border Accent */}
      <div className="h-1.5 w-full bg-[#743C1D]" />

      <main className="p-[10%] pt-20">
        {/* Minimal Header */}
        <header className="mb-24 text-center">
          <h1 className="text-6xl md:text-8xl font-serif italic font-light tracking-tighter mb-12">
            Visual{" "}
            <span className="font-sans font-bold not-italic text-slate-800">
              Stories
            </span>
          </h1>

          <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-[10px] tracking-[0.4em] uppercase transition-all relative pb-2 ${
                  activeFilter === cat
                    ? "text-[#743C1D] font-bold"
                    : "text-slate-400 hover:text-[#743C1D]"
                }`}
              >
                {cat}
                {activeFilter === cat && (
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#743C1D]" />
                )}
              </button>
            ))}
          </nav>
        </header>

        {/* Pure Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-10 space-y-10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden animate-in fade-in duration-1000"
            >
              {/* Image Layer */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
              />

              {/* Sophisticated Hover Overlay (Contains ALL text) */}
              <div className="absolute inset-0 bg-[#4A3728]/80 opacity-0 group-hover:opacity-100 transition-all duration-700 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
                <p className="text-white/60 text-[9px] uppercase tracking-[0.4em] mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.category}
                </p>

                <h3 className="text-white text-3xl font-serif italic mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  {item.title}
                </h3>

                <div className="w-8 h-[1px] bg-white/30 my-4 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-150" />

                <p className="text-white/80 text-[10px] uppercase tracking-[0.2em] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                  {item.location}
                </p>

                {/* Decorative View indicator */}
                <div className="mt-8 border border-white/20 px-6 py-2 text-[8px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                  View Project
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-40 pt-20 border-t border-slate-100 text-center">
          <div className="text-[#743C1D] font-serif italic text-2xl tracking-tighter uppercase mb-4">
            WP
          </div>
          <p className="text-slate-400 text-[9px] uppercase tracking-[0.5em]">
            Curating Love Stories Worldwide
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Gallery;
