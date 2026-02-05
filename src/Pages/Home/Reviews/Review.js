import React from "react";
import mark from "../../../Images/mark.png";
import { Star } from "lucide-react";

const Review = ({ review }) => {
  const { name, image, description, star } = review;
  const userRating = Number(star) || 0;

  return (
    <div className="card w-[80%] bg-base-100 mx-auto group">
      <div className="h-full rounded mx-auto text-center">
        {/* Profile Image Section */}
        <div className="w-40 h-40 border-4 border-white p-2 shadow-lg mx-auto flex items-center justify-center bg-gray-50 rounded transition-transform duration-500 group-hover:scale-105">
          <img
            src={image || "https://i.ibb.co/5GzXkwq/user.png"}
            alt={name}
            className="h-full w-full object-cover rounded"
          />
        </div>

        {/* Quote Mark Section */}
        <div className="w-11 mx-auto">
          <img
            src={mark}
            className="border-4 border-white rounded-full bg-white shadow-lg mx-auto w-11 h-11 -mt-9 relative z-10"
            alt=""
          />
        </div>

        {/* Description */}
        <p className="text-xl text-justify mt-4 leading-relaxed text-gray-700 italic">
          "{description}"
        </p>

        {/* --- Pure CSS Animated Rating Section --- */}
        <div className="flex justify-center items-center gap-1 mt-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pop"
              style={{
                animationDelay: `${i * 150}ms`, // একের পর এক স্টার আসার জন্য ডিলে
                animationFillMode: "both",
              }}
            >
              <Star
                size={20}
                strokeWidth={2.5}
                className={
                  i < userRating
                    ? "text-yellow-400 fill-yellow-400 drop-shadow-sm"
                    : "text-gray-200"
                }
              />
            </div>
          ))}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-serif font-bold text-[#1A1D1F] mt-2 mb-6 tracking-tight">
          {name}
        </h2>
      </div>

      {/* Inline CSS for Animation */}
      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          70% {
            transform: scale(1.2) rotate(10deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
        .animate-pop {
          display: inline-block;
          animation: pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>
    </div>
  );
};

export default Review;
