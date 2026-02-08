import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  MapPin,
  Sparkles,
  Star,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const FindYourMatch = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReligion, setSelectedReligion] = useState("All");
  const [maxAge, setMaxAge] = useState(50);

  // প্যাজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ১. JSON ডাটা ফেচ করা
  useEffect(() => {
    // আপনার লোকাল বা অনলাইন findYourMatch.json থেকে ডাটা ফেচ
    fetch("/findYourMatch.json")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setFilteredProfiles(data);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // ২. ফিল্টারিং লজিক (নাম, লোকেশন, ধর্ম এবং বয়স)
  useEffect(() => {
    const filtered = profiles.filter((profile) => {
      const matchesSearch =
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesReligion =
        selectedReligion === "All" || profile.religion === selectedReligion;

      const matchesAge = profile.age <= maxAge;

      return matchesSearch && matchesReligion && matchesAge;
    });

    setFilteredProfiles(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedReligion, maxAge, profiles]);

  // ৩. প্যাজিনেশন ক্যালকুলেশন
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProfiles = filteredProfiles.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const romanticBg = "#FFF5F5";
  const heartRed = "#E53E3E";
  const charcoal = "#2D3748";

  return (
    <div className="min-h-screen bg-white font-sans text-[#1A1D1F]">
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        {/* --- Sidebar Filter --- */}
        <aside className="w-full lg:w-72">
          <div
            className="p-8 rounded-[2.5rem] sticky top-24 border border-rose-100 shadow-sm"
            style={{ backgroundColor: romanticBg }}
          >
            <h3
              className="font-bold text-xl mb-6 flex items-center gap-2"
              style={{ color: heartRed }}
            >
              <Filter size={20} /> Criteria
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest block mb-3 text-rose-400">
                  Religion
                </label>
                <select
                  className="w-full p-3 bg-white border border-rose-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-200"
                  value={selectedReligion}
                  onChange={(e) => setSelectedReligion(e.target.value)}
                >
                  <option value="All">All Communities</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-black uppercase tracking-widest block mb-3 text-rose-400">
                  Max Age:{" "}
                  <span className="text-rose-600 font-black">{maxAge} yrs</span>
                </label>
                <input
                  type="range"
                  min="18"
                  max="50"
                  value={maxAge}
                  onChange={(e) => setMaxAge(parseInt(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedReligion("All");
                  setMaxAge(50);
                }}
                className="w-full py-3 rounded-xl font-bold text-sm shadow-lg text-white"
                style={{ backgroundColor: heartRed }}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* --- Results Section --- */}
        <section className="flex-1 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <h2
              className="text-4xl font-black italic tracking-tighter uppercase"
              style={{ color: charcoal }}
            >
              Wedding <span className="text-rose-400">Connections</span>
            </h2>

            <div className="relative group">
              <Search
                className="absolute left-4 top-3.5 text-rose-200 group-focus-within:text-rose-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-3.5 bg-rose-50/30 border border-rose-50 rounded-2xl w-full md:w-80 shadow-inner outline-none font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentProfiles.length > 0 ? (
              currentProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="group relative bg-white rounded-[3rem] overflow-hidden border border-rose-50 hover:border-rose-200 transition-all duration-500 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={profile.image}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={profile.name}
                    />
                    <div className="absolute top-5 left-5 bg-white/90 px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                      <Star size={14} className="fill-rose-500 text-rose-500" />
                      <span className="text-xs font-black text-rose-600 italic">
                        #{profile.id}
                      </span>
                    </div>
                  </div>

                  {/* Profile Details (Using Info from JSON) */}
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-1">
                      <h4
                        className="font-black text-2xl tracking-tighter uppercase italic"
                        style={{ color: charcoal }}
                      >
                        {profile.name}, {profile.age}
                      </h4>
                      <Users size={16} className="text-rose-500" />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] font-bold px-2 py-1 bg-stone-100 rounded text-stone-500 uppercase">
                        {profile.status}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-1 bg-rose-50 rounded text-rose-500 uppercase">
                        {profile.professionalInfo.category}
                      </span>
                    </div>

                    <p className="text-stone-400 text-xs font-bold mb-6 line-clamp-1 italic">
                      <GraduationCap className="inline mr-1" size={14} />{" "}
                      {profile.academicStatus.honors}
                    </p>

                    <div className="flex items-center text-stone-400 text-xs gap-1 font-bold mb-8">
                      <MapPin size={14} className="text-rose-300" />{" "}
                      {profile.address}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/findYourMatch/${profile.id}`}
                        className="flex-[4]"
                      >
                        <button
                          className="w-full text-white py-4 rounded-2xl font-bold text-sm shadow-xl transition-all active:scale-95 uppercase tracking-widest"
                          style={{ backgroundColor: heartRed }}
                        >
                          View Bio-Data
                        </button>
                      </Link>
                      <button className="flex-1 flex items-center justify-center border-2 rounded-2xl border-rose-100 hover:bg-rose-50 transition-all">
                        <Heart
                          size={20}
                          className="text-rose-200 hover:text-rose-500 transition-colors"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 bg-rose-50/20 rounded-[4rem] text-center border-2 border-dashed border-rose-100">
                <Sparkles
                  size={48}
                  className="mx-auto text-rose-200 mb-4 animate-pulse"
                />
                <p className="text-rose-300 font-bold italic text-lg">
                  No biodata found matching your criteria.
                </p>
              </div>
            )}
          </div>

          {/* --- Pagination Controls --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-16 pb-10">
              <button
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
                className="p-3 rounded-xl border border-rose-100 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronLeft size={20} />
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-12 h-12 rounded-xl font-bold border transition-all ${currentPage === index + 1 ? "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-200" : "bg-white text-rose-300 border-rose-50 hover:border-rose-200"}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
                className="p-3 rounded-xl border border-rose-100 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

// Helper Icon for card
const GraduationCap = ({ size, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

export default FindYourMatch;
