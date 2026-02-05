import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F6] px-6">
      <div className="max-w-xl w-full text-center bg-white shadow-2xl rounded-3xl p-10 border border-pink-100">
        {/* Decorative Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-4xl">
            💍
          </div>
        </div>

        {/* 404 Text */}
        <h1 className="text-7xl font-extrabold text-rose-400 mb-4">404</h1>

        {/* Message */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Oops! Love Took a Wrong Turn
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you are looking for doesn’t exist. Let’s take you back to
          where beautiful stories begin.
        </p>

        {/* Button */}
        <Link
          to="/"
          className="inline-block bg-rose-400 hover:bg-rose-500 text-white px-8 py-3 rounded-full font-medium transition duration-300 shadow-lg"
        >
          Go Back Home
        </Link>

        {/* Footer Text */}
        <p className="mt-8 text-sm text-gray-400 italic">
          Wedding Planner • Planning Love & Celebration
        </p>
      </div>
    </div>
  );
};

export default NotFound;
