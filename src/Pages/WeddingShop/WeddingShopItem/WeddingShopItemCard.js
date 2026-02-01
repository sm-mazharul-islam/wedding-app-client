import React from "react";
import { Link } from "react-router-dom";
import "./../../../App.css";

const WeddingShopItemCard = ({ product }) => {
  const { id, name, image, priceOne, priceTwo, description, rating } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl mt-9 p-4 ">
      <figure>
        <img src={image[0].url} className="w-full h-[430px]" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center text-2xl">
          {name}!{/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <div className="card-actions  justify-end text-center">
          <del className="text-xl font-bold">MRP: ${priceOne}</del>
          <p className="text-xl font-bold">Offer Price Go</p>
        </div>
        <div className="card-actions justify-end">
          {/* <div className="badge badge-outline">Fashion</div> */}
          <div className="main">
            <Link
              to={{
                pathname: `/productDetails/${product._id}`,
              }}
            >
              <button className="btn-1">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingShopItemCard;
