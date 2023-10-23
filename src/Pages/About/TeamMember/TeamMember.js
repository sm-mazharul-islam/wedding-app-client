import React from "react";
import { FaFacebook } from "react-icons/fa";
import { SiTwitter } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";

const TeamMember = ({ member }) => {
  const { name, description, img } = member;
  return (
    <div
      className="card w-80 h-[95%] bg-base-100 shadow-xl "
      style={{
        borderRadius: "200px 200px 10px 10px",
        margin: "10px 10px 10px 2px",
      }}
    >
      <div className=" p-3 ">
        <figure>
          <img
            src={img}
            alt="Shoes"
            style={{
              borderRadius: "200px 200px 10px 10px",
              width: "450px",
              height: "300px",
            }}
          />
        </figure>
        <div className="card-body">
          <h2
            className="card-title mx-auto text-2xl"
            style={{ color: "#432818" }}
          >
            {name}
          </h2>
          <div
            className="flex flex-row gap-4 justify-center text-xl m-4  "
            style={{ color: "#432818" }}
          >
            <FaFacebook />
            <SiTwitter />
            <BsYoutube />
          </div>
          <p className="text-center text-[15px]" style={{ color: "#432818" }}>
            {description}
          </p>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
