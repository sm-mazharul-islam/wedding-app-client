import React, { useState, useEffect } from "react";
import one from "../../../../Images/1.png";
import two from "../../../../Images/2.png";
import three from "../../../../Images/3.png";
import four from "../../../../Images/4.png";

const CaroselLogo = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const logos = [one, two, three, four];

  useEffect(() => {
    // Timer set to 1000ms (1 second)
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [logos.length]);

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-48 h-48 flex items-center justify-center bg-white border border-gray-100 rounded-lg shadow-sm">
        {/* The image swaps instantly based on the currentIndex */}
        <img
          src={logos[currentIndex]}
          alt="Brand Logo"
          className="max-w-full max-h-full object-contain transition-opacity duration-300"
        />
      </div>
    </div>
  );
};

export default CaroselLogo;
