import React, { useState } from "react";
import WeddingShopBanner from "../WeddingShopBanner/WeddingShopBanner";
import WeddingShopItem from "../WeddingShopItem/WeddingShopItem";

const WeddingShop = () => {
  const [item, setItem] = useState([]);
  return (
    <div className=" bg-base-100">
      <WeddingShopBanner />
      <WeddingShopItem item={item} setItem={setItem}></WeddingShopItem>
    </div>
  );
};

export default WeddingShop;
