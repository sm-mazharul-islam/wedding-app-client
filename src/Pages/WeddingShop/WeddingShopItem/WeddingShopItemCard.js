import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import "./../../../App.css";

const WeddingShopItemCard = ({ product }) => {
  const { _id, name, image, priceOne, priceTwo, rating } = product;

  return (
    <div className="card w-full bg-base-100 shadow-xl mt-9 p-4 rounded-[40px] border border-gray-50 hover:shadow-2xl transition-all duration-300 group">
      {/* Product Image Section */}
      <figure className="relative overflow-hidden rounded-[30px]">
        <img
          src={image[0]?.url}
          className="w-full h-[430px] object-cover transition-transform duration-700 group-hover:scale-110"
          alt={name}
        />
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm border border-gray-100">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-black italic text-[#1A1D1F]">
              {rating}
            </span>
          </div>
        )}
      </figure>

      <div className="card-body px-2 py-6 text-center">
        {/* Title */}
        <h2 className="card-title justify-center text-3xl font-black italic tracking-tighter uppercase mb-2 text-[#1A1D1F]">
          {name}!
        </h2>

        {/* Pricing Section */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <del className="text-xl font-bold text-gray-400 italic">
            MRP: ${priceOne}
          </del>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">
              Offer Price
            </span>
            <p className="text-2xl font-black text-[#1A1D1F] tracking-tighter">
              ${priceTwo}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions justify-center">
          <Link to={`/productDetails/${_id}`} className="w-full">
            <button className="btn w-full bg-[#1A1D1F] hover:bg-black text-white rounded-2xl h-14 border-none shadow-xl flex items-center justify-center gap-2 uppercase text-xs tracking-widest font-bold transition-all active:scale-95 group-hover:gap-3">
              View Details <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WeddingShopItemCard;
