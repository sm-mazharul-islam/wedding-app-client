import React from "react";
import example from "../../../Images/aboutbanner.jpg";
import TeamMembers from "../TeamMember/TeamMembers";
import bg from "../../../Images/bg1-1.jpg";

const About = () => {
  return (
    <div className=" bg-base-100">
      <div>
        <img className="h-[350px] w-[100%]" src={example} alt="" />
      </div>
      <div></div>
      <h1 className="text-center">Hello from About</h1>
      <div
        style={{
          background: `url(${bg})`,
        }}
        className="h-[790px] w-[100%] grid grid-cols-2   text-justify gap-2   "
      >
        <div className="">
          <p className="text-4xl">
            We Plan & Design Weddings That Capture the Imagination
          </p>
          <img
            src="https://lovestory.themerex.net/wp-content/uploads/2016/08/vector-smart-object-copy-12.png"
            alt=""
          />
          <p>
            Weddings are significant events in people’s lives and as such,
            couples are often willing to spend considerable amount of money to
            ensure that their weddings are well-organized. Wedding planners are
            often used by couples who work long hours and have little spare time
            available for sourcing and managing wedding venues.
          </p>
        </div>
        <div></div>
      </div>

      <TeamMembers />
    </div>
  );
};

export default About;
