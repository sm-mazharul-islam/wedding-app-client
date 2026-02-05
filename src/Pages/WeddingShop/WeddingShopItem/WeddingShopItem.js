import React, { useEffect, useState } from "react";
import WeddingShopItemCard from "./WeddingShopItemCard";

const WeddingShopItem = ({ item, setItem }) => {
  useEffect(() => {
    fetch("https://wedding-app-server-eight.vercel.app/weddingShop")
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, []);

  return (
    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto ">
      {item.map((product) => (
        <WeddingShopItemCard
          key={product.id}
          product={product}
        ></WeddingShopItemCard>
      ))}
    </div>
  );
};

export default WeddingShopItem;
