import React, { useEffect, useState } from "react";
import WeddingShopItemCard from "./WeddingShopItemCard";
import {
  Search,
  Filter,
  ShoppingBag,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowUpDown,
} from "lucide-react";

const WeddingShopItem = ({ item, setItem }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("default");

  // --- প্যাজিনেশন স্টেট ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch("http://localhost:5000/weddingShop")
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
        setFilteredItems(data);
      });
  }, [setItem]);

  // --- ফিল্টারিং এবং সর্টিং লজিক (Name, Rating, Price) ---
  useEffect(() => {
    let filtered = [...item];

    // ১. নাম ফিল্টার (Name Filter)
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p._id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // ২. ক্যাটাগরি ফিল্টার
    if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // ৩. প্রাইস রেঞ্জ ফিল্টার (Pricing Filter)
    filtered = filtered.filter(
      (p) => p.priceTwo >= minPrice && p.priceTwo <= maxPrice,
    );

    // ৪. রেটিং ফিল্টার (Rating Filter)
    if (minRating > 0) {
      filtered = filtered.filter((p) => p.rating >= minRating);
    }

    // ৫. হাই-লো সর্টিং লজিক (Price & Rating Sort)
    if (sortBy === "priceLow") filtered.sort((a, b) => a.priceTwo - b.priceTwo);
    if (sortBy === "priceHigh")
      filtered.sort((a, b) => b.priceTwo - a.priceTwo);
    if (sortBy === "ratingHigh") filtered.sort((a, b) => b.rating - a.rating);

    setFilteredItems(filtered);
    setCurrentPage(1); // ফিল্টার চেঞ্জ হলে প্রথম পেজে রিসেট হবে
  }, [
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
    minRating,
    sortBy,
    item,
  ]);

  // --- প্যাজিনেশন ক্যালকুলেশন (Per page 10 products) ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayItems = filteredItems.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // স্মুথ স্ক্রল
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1D1F] font-sans">
      <main className="max-w-[1440px] mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10 text-left">
        {/* --- সাইডবার ফিল্টার --- */}
        <aside className="w-full lg:w-80">
          <div className="p-8 rounded-[40px] sticky top-24 border border-stone-100 shadow-sm bg-[#FAF7F6]">
            <h3
              className="font-bold text-xl mb-6 flex items-center gap-2"
              style={{ color: "#1A1D1F" }}
            >
              <Filter size={20} /> Advanced Filters
            </h3>

            <div className="space-y-6">
              {/* নাম দিয়ে সার্চ (Name Filter) */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-gray-400">
                  Search Product
                </label>
                <div className="relative">
                  <Search
                    className="absolute left-3 top-3 text-gray-300"
                    size={16}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name or ID..."
                    className="w-full pl-10 p-3 bg-white border-none rounded-2xl text-sm outline-none shadow-inner"
                  />
                </div>
              </div>

              {/* প্রাইস রেঞ্জ (Price Filter) */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-gray-400">
                  Max Price: ${maxPrice}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  className="w-full accent-[#1A1D1F] cursor-pointer"
                />
              </div>

              {/* রেটিং ফিল্টার (Rating Filter) */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-gray-400">
                  Minimum Rating
                </label>
                <select
                  className="w-full p-3 bg-white border-none rounded-2xl text-sm outline-none shadow-sm cursor-pointer"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4.0+ Stars</option>
                  <option value="5">5.0 Stars only</option>
                </select>
              </div>

              {/* সর্টিং (High/Low Pricing Filter) */}
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest block mb-2 text-gray-400">
                  Sort By
                </label>
                <select
                  className="w-full p-3 bg-white border-none rounded-2xl text-sm outline-none shadow-sm cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Default</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="ratingHigh">Best Rated</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setMaxPrice(10000);
                  setMinRating(0);
                  setSortBy("default");
                }}
                className="w-full py-4 bg-[#1A1D1F] text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <X size={14} /> Reset All
              </button>
            </div>
          </div>
        </aside>

        {/* --- প্রোডাক্ট গ্রিড এবং প্যাজিনেশন --- */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none">
              Wedding{" "}
              <span className="text-gray-400 font-normal italic">Shop</span>
            </h2>
            <div className="bg-[#1A1D1F] text-white px-4 py-2 rounded-2xl font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-lg">
              <ShoppingBag size={14} /> {filteredItems.length} Products
            </div>
          </div>

          {currentDisplayItems.length > 0 ? (
            <>
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                {currentDisplayItems.map((product) => (
                  <WeddingShopItemCard key={product._id} product={product} />
                ))}
              </div>

              {/* প্যাজিনেশন কন্ট্রোল */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 pb-10">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                    className="p-3 rounded-xl border border-gray-200 hover:bg-[#1A1D1F] hover:text-white transition-all disabled:opacity-30"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all border ${
                        currentPage === index + 1
                          ? "bg-[#1A1D1F] text-white border-[#1A1D1F]"
                          : "bg-white text-gray-400 border-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                    className="p-3 rounded-xl border border-gray-200 hover:bg-[#1A1D1F] hover:text-white transition-all disabled:opacity-30"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center bg-[#FAF7F6] rounded-[40px] border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-black italic uppercase tracking-widest">
                No matching products
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default WeddingShopItem;
