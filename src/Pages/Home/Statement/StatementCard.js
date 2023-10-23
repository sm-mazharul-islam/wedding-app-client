import React from "react";

const StatementCard = () => {
  return (
    <div className="card  w-[100%] lg:card-side bg-base-100 shadow-xl rounded-none  mt-20">
      <img
        className="items-start p-4 w-full sm:w-[42%]  "
        src="https://i.ibb.co/QnrVVWq/about.jpg"
        alt="Album"
      />
      <div className="card-body">
        <h2
          className=" text-[40px] leading-10 lg:mb-3"
          style={{ color: "#A3888C" }}
        >
          Your Successful Wedding is <br /> Our Job.
        </h2>
        <div
          style={{ backgroundColor: "#A3888C" }}
          className="divider mt-[15px] w-[100%] h-[0.1px] m-[auto] "
        ></div>
        <div
          style={{ backgroundColor: "#A3888C" }}
          className="divider mt-[2px] w-[75%]  h-[0.1px] "
        ></div>

        <h3 className="lg:mt-3 text-[30px]" style={{ color: "#848892" }}>
          Contrary to popular belief, Lorem Ipsum is not simply random text.
        </h3>

        <p
          className="lg:mt-10"
          style={{ color: "#848892", textAlign: "justify" }}
        >
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text and
          telifotion vision.
        </p>
        {/* <div className="card-actions justify-end ">
            <button className="btn btn-primary">Listen</button>
          </div> */}
      </div>
    </div>
  );
};

export default StatementCard;
