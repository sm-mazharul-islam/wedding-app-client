import React from "react";
import Services from "../Home/Services/Services";

const EventCoordination = () => {
  return (
    <div>
      {/* 1. No 'limit' prop means it shows ALL data.
          2. isFullView={true} triggers the simple background design.
      */}
      <Services isFullView={true} />
    </div>
  );
};

export default EventCoordination;
