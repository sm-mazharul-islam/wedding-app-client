import React from "react";
import sectionImage2 from "../../../Images/section-title2.png";
import Service from "./Service";
import service1 from "../../../Images/service01.jpg";
import { useQuery } from "@tanstack/react-query";
import BASE_URL from "../../../config";

const Services = ({ limit, isFullView }) => {
  // 1. Fetching data from the backend
  const {
    data: servicesOptions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/servicesPackage`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  // 2. Handling Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // 3. Handling Error State
  if (error) {
    return (
      <div className="text-center text-error py-10">Error: {error.message}</div>
    );
  }

  // LOGIC: If limit is passed (like 3), we slice. Otherwise, show all.
  const displayData = limit ? servicesOptions.slice(0, limit) : servicesOptions;

  return (
    <div className={isFullView ? "bg-slate-50 py-16" : "bg-transparent pb-20"}>
      {/* DESIGN TOGGLE:
          - If isFullView is FALSE: Show the "Pricing Plan" style with the big background image.
          - If isFullView is TRUE: Show a clean, centered title for the Event Coordination page.
      */}
      {!isFullView ? (
        <div
          className="mt-16"
          style={{
            background: `url(${service1})`,
            backgroundSize: "cover",
            marginBottom: "50px",
            paddingTop: "150px",
          }}
        >
          <img
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              width: "70px",
              marginBottom: "-25px",
              marginTop: "10px",
            }}
            src={sectionImage2}
            alt="Section Decoration"
          />

          <h2
            style={{
              fontFamily: `'Montserrat', sans-serif`,
            }}
            className="text-center text-[40px] leading-13 text-white"
          >
            Our Perfect Pricing Plan
          </h2>
          <div className="flex flex-col w-[30%] h-20 m-[auto] pb-64">
            <div
              style={{ backgroundColor: "white" }}
              className="divider mt-[-1px]"
            ></div>
            <div
              style={{ backgroundColor: "white" }}
              className="divider mt-[-10px] w-[70%] m-[auto]"
            ></div>
          </div>
        </div>
      ) : (
        <div className="text-center mb-16 pt-10">
          <h2 className="text-4xl font-bold text-gray-800 uppercase tracking-widest">
            Event Coordination Packages
          </h2>
          <div className="w-24 h-1 bg-[#C4AAAD] mx-auto mt-4"></div>
        </div>
      )}

      {/* GRID SECTION:
          - Uses -mt-64 only when overlapping the background image (isFullView = false).
          - Passes isEventPage={isFullView} to Service.jsx so buttons can change text.
      */}
      <div
        className={`grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto px-4 ${isFullView ? "mt-0" : "-mt-64"}`}
      >
        {displayData.map((serviceItem) => (
          <Service
            key={serviceItem._id}
            service={serviceItem}
            isEventPage={isFullView}
          />
        ))}
      </div>
    </div>
  );
};

export default Services;
