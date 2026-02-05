//!!!!

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // Recommended for feedback
import Swal from "sweetalert2";

const WeddingShopSingleItemCard = ({ detail }) => {
  const {
    _id,
    id,
    name,
    description,
    image = [],
    priceOne,
    priceTwo,
  } = detail || {};
  const { user } = useContext(AuthContext);
  const productId = _id || id;

  const {
    data: liveProduct,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["servicesPackage", productId],
    queryFn: async () => {
      const res = await fetch(
        `https://wedding-app-server-eight.vercel.app/servicesPackage/${productId}`,
      );
      if (!res.ok) throw new Error("Failed to fetch live stock");
      return res.json();
    },
    enabled: !!productId,
    refetchInterval: 5000,
  });

  const inStock = liveProduct?.inStock ?? detail?.inStock ?? 0;
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (Array.isArray(image) && image.length > 0) {
      setMainImage(image[0]);
    }
  }, [image]);

  const [amount, setAmount] = useState(inStock > 0 ? 1 : 0);

  useEffect(() => {
    if (inStock <= 0) {
      setAmount(0);
    } else if (amount === 0 && inStock > 0) {
      setAmount(1);
    }
  }, [inStock, amount]);

  const setDecrease = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(inStock > 0 ? 1 : 0);
  };

  const setIncrease = () => {
    if (amount < inStock) {
      setAmount(amount + 1);
    }
  };

  const handleAddToCart = () => {
    if (!user?.uid) {
      Swal.fire(
        "Login Required",
        "Please login to add items to your cart.",
        "info",
      );
      return;
    }

    // স্টক চেক
    if (amount > inStock) {
      Swal.fire(
        "Out of Stock",
        "Available items are less than your selected quantity.",
        "warning",
      );
      refetch();
      return;
    }

    // ১. ডাটা প্রিপেয়ার করা
    // এখানে নিশ্চিত করুন আপনার কম্পোনেন্টে '_id' ভেরিয়েবলটি ডাটাবেজ থেকে আসছে
    const orderData = {
      productId: _id, // আপনার ডাটাবেজের অরিজিনাল ObjectId (e.g. 6666077f...)
      userEmail: user?.email,
      userName: user?.displayName,
      packageName: name,
      price: priceTwo,
      quantity: amount,
      image: mainImage?.url || (image?.length > 0 ? image[0].url : ""),
      status: "pending",
      orderDate: new Date().toISOString(),
    };

    // ২. ডাটাবেজে পাঠানো
    fetch("https://wedding-app-server-eight.vercel.app/orders", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          // ৩. লোকাল স্টোরেজ সিঙ্ক
          const userCartKey = `cart_${user.uid}`;
          const existingCart = JSON.parse(
            localStorage.getItem(userCartKey) || "[]",
          );

          // পুরানো ভুল ডাটা থাকলে তা ফিল্টার করে ফেলা (যাতে 'Invalid Cart Data' আর না আসে)
          const cleanedCart = existingCart.filter(
            (item) => item.productId || item._id,
          );

          const isExist = cleanedCart.find(
            (item) => (item.productId || item._id) === orderData.productId,
          );

          if (!isExist) {
            cleanedCart.push(orderData);
          }

          localStorage.setItem(userCartKey, JSON.stringify(cleanedCart));

          // ৪. গ্লোবাল ইভেন্ট ডিসপ্যাচ
          window.dispatchEvent(new Event("cartUpdated"));

          Swal.fire({
            title: "Added!",
            text: `${name} has been added to your cart.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.error("Database Order Error:", err);
        Swal.fire("Error", "Failed to sync with database.", "error");
      });
  };
  if (isLoading && !detail)
    return (
      <div className="p-20 text-center font-bold">
        Connecting to stock server...
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={mainImage?.url || "https://i.ibb.co/5GzXkwq/user.png"}
                style={{ width: "488px", height: "565px" }}
                alt={name}
                className="rounded-2xl shadow-sm object-cover transition-transform hover:scale-105"
                onError={(e) => {
                  e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                }}
              />
            </div>
            <div className="grid grid-rows-1 grid-flow-col gap-4 mt-4">
              {image?.map((img, index) => (
                <figure key={index}>
                  <img
                    src={img.url}
                    style={{
                      width: "150px",
                      height: "100px",
                      cursor: "pointer",
                      border:
                        mainImage?.url === img.url
                          ? "2px solid #D4B0A5"
                          : "none",
                    }}
                    alt={`${name} thumbnail`}
                    onClick={() => setMainImage(img)}
                    className="rounded-lg object-cover shadow-sm"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="m-9 lg:w-1/2">
            <h1 className="text-5xl font-extrabold text-[#1A1D1F] tracking-tight">
              {name}
            </h1>

            <p className="py-2 text-[15px] font-bold mt-2 uppercase tracking-widest">
              Status:{" "}
              {inStock > 0 ? (
                <span className="text-green-500">{inStock} In Stock</span>
              ) : (
                <span className="text-red-500 italic">Out of Stock</span>
              )}
            </p>

            <div className="flex items-center gap-4 mt-4">
              <del className="text-xl text-gray-400 font-bold">
                MRP: ${priceOne + 250}
              </del>
              <p className="text-3xl font-black text-black">
                Price: ${priceTwo}
              </p>
            </div>

            <p className="py-6 text-gray-600 leading-relaxed text-lg border-b border-gray-100">
              {description}
            </p>

            <div className="py-6 flex items-center">
              <span className="mr-6 font-bold text-gray-700">
                Select Quantity:
              </span>
              <div className="flex items-center bg-gray-50 rounded-xl p-1 border">
                <button
                  className="btn btn-ghost btn-sm px-4"
                  onClick={setDecrease}
                  disabled={inStock <= 0}
                >
                  -
                </button>
                <span className="px-6 font-black text-lg">{amount}</span>
                <button
                  className="btn btn-ghost btn-sm px-4"
                  onClick={setIncrease}
                  disabled={inStock <= 0 || amount >= inStock}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`btn btn-lg w-full lg:w-auto px-12 rounded-2xl shadow-xl transition-all ${
                inStock <= 0
                  ? "btn-disabled bg-gray-200 text-gray-400"
                  : "bg-black hover:bg-gray-800 text-white border-none"
              }`}
              onClick={handleAddToCart}
              disabled={inStock <= 0}
            >
              {inStock > 0 ? "Reserve Now" : "Stock Closed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingShopSingleItemCard;
