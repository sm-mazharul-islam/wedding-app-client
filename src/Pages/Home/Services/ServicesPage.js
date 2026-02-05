import React from "react";
import Services from "./Services";

const ServicesPage = () => {
  return (
    <div>
      {/* This forces only 3 items to appear */}
      <Services limit={3} />
    </div>
  );
};

export default ServicesPage;
