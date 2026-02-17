import React from "react";
import InfoCard from "./InfoCard";
import "./Info.css";

const InfoCards = () => {
  const cardData = [
    {
      id: 1,
      name: "cute couple",
      description: "Best Wedding Gown For Your Dream Day",
      date: "23 Sep 2022",
      image: "https://i.ibb.co/ynVWTmt/img-10-f706743029d789967d6b.jpg",
    },
    {
      id: 2,
      name: "cute couple",
      description: "Top wedding fresh flower decoration idea",
      date: "23 Sep 2022",
      image: "https://i.ibb.co/DYn4Cyc/img-11-9697e6c19843e2fe4544.jpg",
    },
    {
      id: 3,
      name: "cute couple",
      description: "Best wedding gift you may like & choose.",
      date: "23 Sep 2022",
      image: "https://i.ibb.co/wrqMPfY/img-12-de456559ae9d9f542c03.jpg",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto">
      <h3 className="text-center text-[40px] leading-15 ">
        <img
          style={{
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "70px",
            marginBottom: "-30px",
            marginTop: "10px",
          }}
          src="https://i.ibb.co/PGSXyL3/section-title-1.png"
          alt=""
        />
        <span className="t3"> Latest News</span> <br />
      </h3>

      <div className="flex flex-col w-[40%]  h-20 m-[auto] ">
        <div className="divider mt-[-1px]"></div>
        <div className="divider mt-[-20px] w-[70%] m-[auto]"></div>
      </div>

      <div className="grid  sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-2 grid-rows-1 gap-2 mt-2 ">
        <div className="card flex-col w-[90%] mx-auto grid">
          <div className="trans1 ">
            <img
              src="https://i.ibb.co/92C47Np/img-9-c20b05977016172363e7.jpg"
              style={{ width: "100%" }}
              className="pic mt-2"
              alt=""
            />
          </div>
          <div className="card-body">
            <h2 className="t2 card-title text-[32px] leading-9  ">
              {" "}
              Photography is the important part of wedding.
            </h2>
            <h2 className="t1">25 Sep 2022</h2>
          </div>
        </div>
        <div className="col-span-1">
          {cardData.map((card) => (
            <InfoCard key={card.id} card={card}></InfoCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
