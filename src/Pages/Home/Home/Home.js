import React from "react";
import Footer from "../../Shared/Footer/Footer";
import AmazingWork from "../AmazingWork/AmazingWork";
import Banner from "../Banner/Banner";
import InfoCards from "../InfoCards/InfoCards";
import Offer from "../Offer/Offer";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";
import Statement from "../Statement/Statement";

const Home = () => {
  return (
    // className='mx-5'
    <div className="bg-base-100">
      <Banner />
      <Offer />
      <Statement />
      <AmazingWork />
      <Reviews />
      <Services />
      <InfoCards />
    </div>
  );
};

export default Home;
