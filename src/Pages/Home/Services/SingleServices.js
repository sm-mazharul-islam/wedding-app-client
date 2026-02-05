import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

const SingleServices = () => {
  const { _id } = useParams();

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["singleService", _id],
    queryFn: async () => {
      const res = await fetch(
        `https://wedding-app-server-eight.vercel.app/servicesPackage/${_id}`,
      );
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-pink-600"></span>
      </div>
    );
  }

  const {
    name,
    nameTwo,
    price,
    priceOne,
    description,
    descriptionTwo,
    image,
    headerImage,
  } = service;

  return (
    <div className="bg-[#faf7f5]">
      {/* ================= HERO HEADER ================= */}
      <header
        className="relative h-[45vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span className="uppercase tracking-[4px] text-pink-400 font-semibold">
            Exclusive Services
          </span>
          <h1 className="text-white text-4xl md:text-6xl font-extrabold mt-4">
            Make Your Day <span className="text-pink-500">Unforgettable</span>
          </h1>
          <p className="text-gray-200 max-w-2xl mt-6">
            Choose from our beautifully crafted wedding packages designed for
            elegance, comfort and luxury.
          </p>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-[1440px] mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* IMAGE SIDE */}
          <div className="relative">
            <img
              src={image}
              alt="service"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />

            <div className="absolute -bottom-6 left-6 bg-white px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-semibold text-gray-700">
                Premium Wedding Service
              </span>
            </div>
          </div>

          {/* DETAILS SIDE */}
          <div className="space-y-10">
            {/* STANDARD PACKAGE */}
            <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
              <span className="absolute -top-4 right-6 bg-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Popular
              </span>

              <h2 className="text-3xl font-bold text-gray-800">{name}</h2>

              <p className="text-gray-600 mt-4 leading-relaxed">
                {description}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-4xl font-extrabold text-pink-600">
                  ${price}
                </span>

                <button className="px-8 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
                  Book Standard
                </button>
              </div>
            </div>

            {/* DIAMOND PACKAGE */}
            <div className="relative bg-gradient-to-br from-[#ec4899] to-[#9333ea] rounded-3xl p-8 shadow-2xl text-white hover:scale-[1.02] transition">
              <span className="absolute -top-4 right-6 bg-white text-pink-600 px-4 py-1 rounded-full text-sm font-bold">
                Luxury
              </span>

              <h2 className="text-3xl font-bold">{nameTwo}</h2>

              <p className="mt-4 opacity-95 leading-relaxed">
                {descriptionTwo}
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-4xl font-extrabold">${priceOne}</span>

                <button className="px-8 py-3 rounded-full bg-white text-pink-600 font-semibold hover:bg-gray-100 transition">
                  Book Diamond
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleServices;
