//!
import React, { useEffect } from "react";
import WeddingShopSingleItemCard from "./WeddingShopSingleItemCard";
import { useParams } from "react-router-dom";

const WeddingShopSingleItem = ({ detail, setDetail }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetching the specific wedding product details by ID
      fetch(`https://wedding-app-server-eight.vercel.app/weddingShop/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setDetail(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }

    // Cleanup function: optional, clears detail when leaving the page
    return () => setDetail(null);
  }, [id, setDetail]); // Added [id] so it re-runs when the URL changes

  return (
    <div className="container mx-auto">
      {detail ? (
        <WeddingShopSingleItemCard detail={detail} />
      ) : (
        <div className="flex justify-center items-center h-96">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="ml-4 font-serif text-gray-500">
            Loading Wedding Details...
          </p>
        </div>
      )}
    </div>
  );
};

export default WeddingShopSingleItem;
