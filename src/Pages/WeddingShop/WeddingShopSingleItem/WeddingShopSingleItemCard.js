// import React, { useState } from "react";

// const WeddingShopSingleItemCard = ({ detail }) => {
//   const { id, name, description, image, priceOne, priceTwo, inStock } = detail;
//   console.log(detail);

//   // const [mainImage, setMainImage] = useState(image[0]);

//   const [mainImage, setMainImage] = useState(
//     Array.isArray(image) && image.length > 0 ? image[0] : null,
//   );
//   const [amount, setAmount] = useState(1);
//   const setDecrease = () => {
//     amount > 1 ? setAmount(amount - 1) : setAmount(1);
//   };
//   const setIncrease = () => {
//     amount < inStock ? setAmount(amount + 1) : setAmount(inStock);
//   };

//   return (
//     <div>
//       <div>
//         <div className="hero">
//           <div className="hero-content flex-col lg:flex-row">
//             <div>
//               <div>
//                 {mainImage?.url && (
//                   <img
//                     src={mainImage.url}
//                     style={{ width: "488px", height: "565px" }}
//                     alt=""
//                   />
//                 )}
//                 Lorem ipsum dolor sit amet consectetur adipisicing elit.
//                 Officiis laboriosam fugiat explicabo id voluptatem aspernatur
//                 obcaecati quis praesentium dolore corporis.
//               </div>
//               <div className="grid grid-rows-1 grid-flow-col gap-4 mr-9">
//                 {detail?.image?.map((img) => {
//                   return (
//                     <figure>
//                       <img
//                         src={img.url}
//                         style={{
//                           width: "150px",
//                           height: "100px",
//                           marginTop: "10px",
//                         }}
//                         alt=""
//                         onClick={() => setMainImage(img)}
//                       />
//                     </figure>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="m-9">
//               <h1 className="text-5xl font-bold">{name}</h1>
//               <p className="py-2">Write your comment</p>
//               <p className="py-2 text-[15px]">
//                 {inStock > 0 ? "In Stock" : "Not Available"}
//               </p>
//               <div className="card-actions  justify-start text-center">
//                 <del className="text-xl font-bold">MRP:${priceOne + 250}</del>
//                 <p className="px-4 text-xl font-bold">MRP: ${priceTwo}</p>
//               </div>
//               <p className="py-4 text-xl">{description}</p>
//               <p className="py-2 ">
//                 {" "}
//                 Quantity:
//                 <button
//                   className="btn btn-outline p-3 border-2 m-2 "
//                   onClick={() => setIncrease()}
//                 >
//                   +
//                 </button>
//                 <span className="p-3 border-2">{amount}</span>
//                 <button
//                   className="btn btn-outline p-3 border-2 m-2"
//                   onClick={() => setDecrease()}
//                 >
//                   -
//                 </button>
//               </p>

//               <button className="btn btn-outline  my-2">Add To Cart</button>
//               <br />
//               <button className="btn btn-outline  my-2">Add To Wishlist</button>
//               <br />
//               <button className="btn btn-outline  my-2">Ask a Question</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeddingShopSingleItemCard;

//!

// import React, { useState, useContext } from "react"; // Added useContext
// import { AuthContext } from "../../../contexts/AuthProvider"; // Import your AuthContext

// const WeddingShopSingleItemCard = ({ detail }) => {
//   const { id, name, description, image, priceOne, priceTwo, inStock } = detail;

//   // Access the user from your AuthContext
//   const { user } = useContext(AuthContext);

//   const [mainImage, setMainImage] = useState(
//     Array.isArray(image) && image.length > 0 ? image[0] : null,
//   );
//   const [amount, setAmount] = useState(1);

//   const setDecrease = () => {
//     amount > 1 ? setAmount(amount - 1) : setAmount(1);
//   };
//   const setIncrease = () => {
//     amount < inStock ? setAmount(amount + 1) : setAmount(inStock);
//   };

//   // --- Add To Cart Implementation ---
//   const handleAddToCart = () => {
//     // 1. Safety check: Only allow adding if a user is logged in
//     if (!user?.uid) {
//       alert("Please login to add items to your cart.");
//       return;
//     }

//     const cartItem = {
//       id,
//       name,
//       price: priceTwo,
//       quantity: amount,
//       image: mainImage?.url,
//     };

//     // 2. Define a user-specific key
//     const userCartKey = `cart_${user.uid}`;

//     // 3. Get cart data for THIS specific user
//     const existingCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

//     const itemIndex = existingCart.findIndex((item) => item.id === id);
//     if (itemIndex > -1) {
//       existingCart[itemIndex].quantity += amount;
//     } else {
//       existingCart.push(cartItem);
//     }

//     // 4. Save back to user-specific storage
//     localStorage.setItem(userCartKey, JSON.stringify(existingCart));

//     // Signals the navbar to update the count
//     window.dispatchEvent(new Event("cartUpdated"));

//     alert(`${name} added to your personal cart!`);
//   };

//   return (
//     <div>
//       <div className="hero">
//         <div className="hero-content flex-col lg:flex-row">
//           <div>
//             <div>
//               {mainImage?.url && (
//                 <img
//                   src={mainImage.url}
//                   style={{ width: "488px", height: "565px" }}
//                   alt={name}
//                 />
//               )}
//             </div>
//             <div className="grid grid-rows-1 grid-flow-col gap-4 mr-9">
//               {detail?.image?.map((img, index) => (
//                 <figure key={index}>
//                   <img
//                     src={img.url}
//                     style={{
//                       width: "150px",
//                       height: "100px",
//                       marginTop: "10px",
//                       cursor: "pointer",
//                       border:
//                         mainImage?.url === img.url
//                           ? "2px solid #D4B0A5"
//                           : "none",
//                     }}
//                     alt={`${name} thumbnail`}
//                     onClick={() => setMainImage(img)}
//                   />
//                 </figure>
//               ))}
//             </div>
//           </div>

//           <div className="m-9">
//             <h1 className="text-5xl font-bold">{name}</h1>
//             <p className="py-2 text-[15px] font-semibold">
//               Status:{" "}
//               {inStock > 0 ? (
//                 <span className="text-success">In Stock</span>
//               ) : (
//                 <span className="text-error">Not Available</span>
//               )}
//             </p>
//             <div className="card-actions justify-start text-center">
//               <del className="text-xl text-gray-400 font-bold">
//                 MRP: ${priceOne + 250}
//               </del>
//               <p className="px-4 text-xl font-bold text-primary">
//                 Price: ${priceTwo}
//               </p>
//             </div>
//             <p className="py-4 text-xl">{description}</p>

//             <div className="py-2 flex items-center">
//               <span className="mr-4 font-bold">Quantity:</span>
//               <button className="btn btn-outline btn-sm" onClick={setDecrease}>
//                 -
//               </button>
//               <span className="px-6 py-2 border-2 mx-2 font-bold">
//                 {amount}
//               </span>
//               <button className="btn btn-outline btn-sm" onClick={setIncrease}>
//                 +
//               </button>
//             </div>

//             <button
//               className="btn btn-primary my-4 w-full lg:w-auto"
//               onClick={handleAddToCart}
//               disabled={inStock <= 0}
//             >
//               Add To Cart
//             </button>
//             <br />
//             <div className="flex flex-col space-y-2">
//               <button className="btn btn-outline btn-sm w-fit">
//                 Add To Wishlist
//               </button>
//               <button className="btn btn-outline btn-sm w-fit">
//                 Ask a Question
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeddingShopSingleItemCard;
//!

import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const WeddingShopSingleItemCard = ({ detail }) => {
  const { _id, id, name, description, image, priceOne, priceTwo } = detail;
  const { user } = useContext(AuthContext);

  // 1. Fetch LIVE stock data to ensure it updates when someone else buys
  const { data: liveProduct = detail, refetch } = useQuery({
    queryKey: ["servicesPackage", _id || id],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/servicesPackage/${_id || id}`,
      );
      if (!res.ok) throw new Error("Failed to fetch live stock");
      return res.json();
    },
    // Optional: Refresh data every 5 seconds to keep stock synced across users
    refetchInterval: 5000,
  });

  // Use the live stock value
  const inStock = liveProduct.inStock;

  const [mainImage, setMainImage] = useState(
    Array.isArray(image) && image.length > 0 ? image[0] : null,
  );

  const [amount, setAmount] = useState(inStock > 0 ? 1 : 0);

  // Sync amount state if stock drops to 0 in real-time
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
      alert("Please login to add items to your cart.");
      return;
    }

    // Double check stock one last time before adding to prevent overselling
    if (amount > inStock) {
      alert(
        "Stock updated. Available items are less than your selected quantity.",
      );
      refetch();
      return;
    }

    const cartItem = {
      id: _id || id,
      name,
      price: priceTwo,
      quantity: amount,
      image: mainImage?.url,
    };

    const userCartKey = `cart_${user.uid}`;
    const existingCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

    const itemIndex = existingCart.findIndex((item) => item.id === cartItem.id);
    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += amount;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem(userCartKey, JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
    alert(`${name} added to your personal cart!`);
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <div>
              {mainImage?.url && (
                <img
                  src={mainImage.url}
                  style={{ width: "488px", height: "565px" }}
                  alt={name}
                  className="rounded-2xl shadow-sm"
                />
              )}
            </div>
            <div className="grid grid-rows-1 grid-flow-col gap-4 mr-9">
              {detail?.image?.map((img, index) => (
                <figure key={index}>
                  <img
                    src={img.url}
                    style={{
                      width: "150px",
                      height: "100px",
                      marginTop: "10px",
                      cursor: "pointer",
                      border:
                        mainImage?.url === img.url
                          ? "2px solid #D4B0A5"
                          : "none",
                    }}
                    alt={`${name} thumbnail`}
                    onClick={() => setMainImage(img)}
                    className="rounded-lg"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="m-9">
            <h1 className="text-5xl font-bold">{name}</h1>

            {/* LIVE STOCK STATUS - Changes based on DB numbers */}
            <p className="py-2 text-[15px] font-semibold">
              Status:{" "}
              {inStock > 0 ? (
                <span className="text-success">
                  {inStock} Items Available in Stock
                </span>
              ) : (
                <span className="text-error font-bold blur-[0.5px]">
                  Out of Stock / Closed
                </span>
              )}
            </p>

            <div className="card-actions justify-start text-center">
              <del className="text-xl text-gray-400 font-bold">
                MRP: ${priceOne + 250}
              </del>
              <p className="px-4 text-xl font-bold text-primary">
                Price: ${priceTwo}
              </p>
            </div>
            <p className="py-4 text-xl">{description}</p>

            <div className="py-2 flex items-center">
              <span className="mr-4 font-bold">Quantity:</span>
              <button
                className="btn btn-outline btn-sm"
                onClick={setDecrease}
                disabled={inStock <= 0}
              >
                -
              </button>
              <span className="px-6 py-2 border-2 mx-2 font-bold">
                {amount}
              </span>
              <button
                className="btn btn-outline btn-sm"
                onClick={setIncrease}
                disabled={inStock <= 0 || amount >= inStock}
              >
                +
              </button>
            </div>

            {/* DYNAMIC BUTTON - Blurs and disables when inStock is 0 */}
            <button
              className={`btn my-4 w-full lg:w-auto transition-all duration-300 ${
                inStock <= 0
                  ? "btn-disabled bg-gray-300 text-gray-400 cursor-not-allowed blur-[1px]"
                  : "btn-primary shadow-md hover:shadow-lg"
              }`}
              onClick={handleAddToCart}
              disabled={inStock <= 0}
            >
              {inStock > 0 ? "Add To Cart" : "Stock Closed"}
            </button>

            <br />
            <div className="flex flex-col space-y-2">
              <button className="btn btn-outline btn-sm w-fit">
                Add To Wishlist
              </button>
              <button className="btn btn-outline btn-sm w-fit">
                Ask a Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingShopSingleItemCard;
