import React, { useState } from "react";
import { Search, Filter, Heart, MapPin, Coffee, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const FindYourMatch = () => {
  // Demo Data for your CSE/Web Dev Portfolio vibes
  const profiles = [
    {
      id: 1,
      name: "S M Mazharul",
      role: "Next.js Expert",
      location: "Dhaka, BD",
      match: "99%",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    },
    {
      id: 2,
      name: "Sarah J.",
      role: "UI/UX Designer",
      location: "Remote",
      match: "95%",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    },
    {
      id: 3,
      name: "Tanvir Ahsan",
      role: "Backend Developer",
      location: "Chittagong, BD",
      match: "88%",
      img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
    },
    {
      id: 4,
      name: "Aliza Khan",
      role: "React Specialist",
      location: "Sylhet, BD",
      match: "82%",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    },
  ];

  // Theme Colors
  const navBg = "#FAF7F6";
  const chocolateDark = "#3E2723"; // Deep Espresso
  const chocolateMain = "#5D4037"; // Rich Cocoa
  const chocolateLight = "#D7CCC8"; // Milky Chocolate

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      {/* --- Navbar (Using your specific color) --- */}
      {/* <nav
        style={{ backgroundColor: navBg }}
        className="border-b sticky top-0 z-50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <span
                className="text-xl font-black tracking-tighter"
                style={{ color: chocolateDark }}
              >
                MILE <span style={{ color: chocolateMain }}>SNAP</span>
              </span>
              <div className="hidden md:flex space-x-6 text-sm font-bold uppercase tracking-wide">
                <a
                  href="#"
                  className="hover:opacity-70 transition"
                  style={{ color: chocolateMain }}
                >
                  Home
                </a>
                <a
                  href="#"
                  className="border-b-2 pb-1"
                  style={{ color: chocolateDark, borderColor: chocolateDark }}
                >
                  Find Your Match
                </a>
                <a
                  href="#"
                  className="hover:opacity-70 transition"
                  style={{ color: chocolateMain }}
                >
                  Projects
                </a>
              </div>
            </div>
            <button
              className="px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-105"
              style={{ backgroundColor: chocolateDark }}
            >
              HIRE ME
            </button>
          </div>
        </div>
      </nav> */}

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-72">
          <div
            className="p-8 rounded-3xl sticky top-24 border border-stone-100"
            style={{ backgroundColor: navBg }}
          >
            <h3
              className="font-bold text-lg mb-6 flex items-center gap-2"
              style={{ color: chocolateDark }}
            >
              <Filter size={20} /> Preferences
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  className="text-xs font-black uppercase tracking-widest block mb-3"
                  style={{ color: chocolateMain }}
                >
                  Tech Stack
                </label>
                <select className="w-full p-3 bg-white border-none rounded-xl text-sm shadow-inner focus:ring-2 focus:ring-stone-200 outline-none">
                  <option>Next.js / React</option>
                  <option>Tailwind CSS</option>
                  <option>TypeScript</option>
                  <option>Java / Spring Boot</option>
                </select>
              </div>

              <div>
                <label
                  className="text-xs font-black uppercase tracking-widest block mb-3"
                  style={{ color: chocolateMain }}
                >
                  Proximity
                </label>
                <input type="range" className="w-full accent-amber-900" />
              </div>

              <div className="pt-4">
                <button
                  className="w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-transform active:scale-95"
                  style={{ backgroundColor: chocolateMain, color: "#FFF" }}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Section */}
        <section className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
            <div>
              <h2
                className="text-4xl font-black leading-tight"
                style={{ color: chocolateDark }}
              >
                Find Your <br />{" "}
                <span className="text-stone-400">Coding Partner</span>
              </h2>
            </div>
            <div className="relative group">
              <Search
                className="absolute left-4 top-3.5 text-stone-400 group-focus-within:text-amber-900 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by name or skill..."
                className="pl-12 pr-6 py-3.5 bg-stone-50 border-none rounded-2xl w-full md:w-80 shadow-inner focus:ring-2 focus:ring-stone-200 outline-none"
              />
            </div>
          </div>

          {/* User Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="group relative bg-white p-6 rounded-[2rem] border border-stone-100 hover:border-amber-100 transition-all duration-300 hover:shadow-2xl hover:shadow-stone-200/50"
              >
                <div className="flex gap-5">
                  <div className="relative">
                    <img
                      src={profile.img}
                      className="w-28 h-28 rounded-[1.5rem] object-cover shadow-md transition-transform group-hover:rotate-2"
                      alt={profile.name}
                    />
                    <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-sm">
                      <Sparkles size={14} className="text-amber-600" />
                    </div>
                  </div>

                  <div className="flex-1 pt-2">
                    <div className="flex justify-between items-start">
                      <h4
                        className="font-extrabold text-xl"
                        style={{ color: chocolateDark }}
                      >
                        {profile.name}
                      </h4>
                      <div
                        className="text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter"
                        style={{
                          backgroundColor: chocolateLight,
                          color: chocolateDark,
                        }}
                      >
                        {profile.match}
                      </div>
                    </div>
                    <p className="font-medium text-stone-500 text-sm mt-1">
                      {profile.role}
                    </p>
                    <div className="flex items-center text-stone-400 text-xs mt-3 gap-1 font-bold">
                      <MapPin size={14} /> {profile.location}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                    <Link to=""></Link>
                  <button
                    className="flex-[3] text-white py-3.5 rounded-2xl font-bold text-sm transition-all hover:brightness-110 active:scale-95 shadow-md"
                    style={{ backgroundColor: chocolateDark }}
                  >
                    Connect Now
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center border-2 rounded-2xl transition-all hover:bg-red-50 hover:border-red-100 group/heart"
                    style={{ borderColor: chocolateLight }}
                  >
                    <Heart
                      size={20}
                      className="text-stone-300 group-hover/heart:text-red-500 transition-colors"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FindYourMatch;
