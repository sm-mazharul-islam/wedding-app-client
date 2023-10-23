import React from "react";
import { DayPicker } from "react-day-picker";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  return (
    <header className="">
      <div className="hero ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://cdn.pixabay.com/photo/2014/11/13/17/04/heart-529607__480.jpg"
            alt=""
            className="max-w-sm w-[100%] rounded-lg shadow-2xl"
          />
          <div className="mr-6">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppointmentBanner;
