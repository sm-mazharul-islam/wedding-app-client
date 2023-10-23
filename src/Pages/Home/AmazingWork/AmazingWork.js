import React from "react";
import discoverImage from "../../../Images/Discover_Image_01.jpg";
import discoverImage2 from "../../../Images/Discover_Image_03.jpg";

const AmazingWork = () => {
  return (
    <div>
      <h1 className="text-center m-20">Hello form amazing work</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-w-[1440px] mx-auto">
        <img className="w-96 " src={discoverImage} alt="" />
        <img className="w-80 " src={discoverImage} alt="" />
        <img className="w-80 " src={discoverImage} alt="" />
      </div>
      <div></div>
    </div>
  );
};

export default AmazingWork;
