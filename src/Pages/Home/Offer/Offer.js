import React from "react";
import OfferCards from "./OfferCards";

const Offer = () => {
  const provided = [
    {
      id: 1,
      name: "Wedding Dress",
      picture: "https://i.ibb.co/xSL9gHK/img-offer-1.jpg",
    },
    {
      id: 2,
      name: "Event Planning",
      picture: "https://i.ibb.co/D1JQwbm/img-offer-2.png",
    },
    {
      id: 3,
      name: "Photography",
      picture: "https://i.ibb.co/SwWZVY0/img-offer-3.jpg",
    },
    {
      id: 4,
      name: "Cake Design",
      picture: "https://i.ibb.co/Y3GzhDq/img-offer-4.jpg",
    },
  ];
  return (
    <div className="mt-20">
      <div>
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70px",
            marginBottom: "-20px",
          }}
          src="https://i.ibb.co/PGSXyL3/section-title-1.png"
          alt=""
        />

        <h2 className="text-3xl text-center">
          Our Services <br />
          WHAT WE OFFER FOR YOU
        </h2>
        <div
          style={{ backgroundColor: "black" }}
          className="divider mt-5  w-[32%] h-[0.3px] m-[auto]"
        ></div>
        <div
          style={{ backgroundColor: "black" }}
          className="divider mt-[10px] w-[20%] h-[0.3px] m-[auto]"
        ></div>
      </div>
      <div className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1440px] mx-auto gap-8">
        {provided.map((provide) => (
          <OfferCards key={provide.id} provide={provide}></OfferCards>
        ))}
      </div>
    </div>
  );
};

export default Offer;
