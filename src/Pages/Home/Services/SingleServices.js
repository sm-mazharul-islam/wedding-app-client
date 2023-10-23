import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleServices = () => {
  // const {_id} = useParams();
  const [service, setService] = useState({});

  // useEffect(() => {
  //     const hello = async () => {
  //         await

  //         fetch(`http://localhost:5000/servicesPackage/${_id}`)
  //             .then(res => res.json())
  //             .then(data => console.log(data))
  //     }
  //     hello()
  // }, [])
  return (
    <div>
      <header>
        <img
          className="w-[100%] h-[300px]"
          src="https://i.ibb.co/pn8NFxM/pexels-pixabay-414660.jpg"
          alt=""
        />
      </header>
      <div className="max-w-[1440px] mx-auto ">
        <h2 className="text-center text-2xl font-bold m-4">
          {" "}
          This is product / offer details
        </h2>
      </div>
    </div>
  );
};

export default SingleServices;
