import React from "react";
import { Link } from "react-router-dom";

const Service = ({ service }) => {
  const { _id, name, description, price, image } = service;
  return (
    <div className="card w-auto bg-base-100 shadow-xl gap-2 rounded-none mx-auto">
      <figure className="px-4 pt-4 lg:px-8 lg:pt-8">
        <img src={image} className="rounded-none" alt="" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <h2
          className="card-title text-3xl font-bold"
          style={{ color: "#C4AAAD" }}
        >
          {" "}
          ${price}
          <span className="text-xl font-normal" style={{ color: "#C4AAAD" }}>
            /Monthly
          </span>
        </h2>
        <div className="divider"></div>
        <p style={{ color: "#7B7B7B" }}>{description}</p>
        <Link
          to={{
            pathname: `/details/${service._id}`,
          }}
          className="t2 font-bold"
        >
          Choose Package
        </Link>
        <div
          style={{ backgroundColor: "black" }}
          className="divider mt-[-10px] w-[32%] h-[0.3px] m-[auto]"
        ></div>
      </div>
    </div>
  );
};

export default Service;
