// import React, { useEffect, useState } from "react";
// import WeddingShopSingleItemCard from "./WeddingShopSingleItemCard";
// import { useParams } from "react-router-dom";

// const WeddingShopSingleItem = ({ detail, setDetail }) => {
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:5000/weddingShop/${id}`) // Correct the endpoint URL
//         .then((res) => res.json())
//         .then((data) => setDetail(data))
//         .catch((error) => console.error("Error fetching data:", error));
//     }
//   }, []);

//   // const {  name, description, image, priceOne, priceTwo, inStock } = detail;

//   // const [mainImage, setMainImage] = useState(() => {
//   //   try {
//   //     return detail.image[0];
//   //   } catch (error) {
//   //     console.error("Error setting initial main image:", error);
//   //     return null; // Provide a default value or handle the error gracefully
//   //   }
//   // });
//   // const [amount, setAmount] = useState(1);
//   // const setDecrease = () => {
//   //   amount > 1 ? setAmount(amount - 1) : setAmount(1);
//   // };
//   // const setIncrease = () => {
//   //   amount < detail.inStock ? setAmount(amount + 1) : setAmount(detail.inStock);
//   // };

//   return (
//     <div>{detail && <WeddingShopSingleItemCard detail={detail} />}</div>
//     // <div>
//     //   <div>
//     //     <div className="hero  bg-base-100 ">
//     //       <div className="hero-content flex-col lg:flex-row">
//     //         <div>
//     //           <div>
//     //             {mainImage?.url && (
//     //               <img
//     //                 src={mainImage.url}
//     //                 alt=""
//     //                 style={{ width: "488px", height: "565px" }}
//     //               />
//     //             )}
//     //             {/* <img
//     //               src={mainImage.url}
//     //               style={{ width: "488px", height: "565px" }}
//     //               alt=""
//     //             /> */}
//     //             Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     //             Officiis laboriosam fugiat explicabo id voluptatem aspernatur
//     //             obcaecati quis praesentium dolore corporis.
//     //           </div>
//     //           <div className="grid grid-rows-1 grid-flow-col gap-4 mr-9">
//     //             {detail?.image?.map((img) => {
//     //               return (
//     //                 <figure>
//     //                   <img
//     //                     src={img.url}
//     //                     style={{
//     //                       width: "150px",
//     //                       height: "100px",
//     //                       marginTop: "10px",
//     //                     }}
//     //                     alt=""
//     //                     onClick={() => setMainImage(img)}
//     //                   />
//     //                 </figure>
//     //               );
//     //             })}
//     //           </div>
//     //         </div>

//     //         <div className="m-9">
//     //           <h1 className="text-5xl font-bold">{detail.name}</h1>
//     //           <p className="py-2">Write your comment</p>
//     //           <p className="py-2 text-[15px]">
//     //             {detail.inStock > 0 ? "In Stock" : "Not Available"}
//     //           </p>
//     //           <div className="card-actions  justify-start text-center">
//     //             <del className="text-xl font-bold">
//     //               MRP:${detail.priceOne + 250}
//     //             </del>
//     //             <p className="px-4 text-xl font-bold">
//     //               MRP: ${detail.priceTwo}
//     //             </p>
//     //           </div>
//     //           <p className="py-4 text-xl">{detail.description}</p>
//     //           <p className="py-2 ">
//     //             {" "}
//     //             Quantity:
//     //             <button
//     //               className="btn btn-outline p-3 border-2 m-2 "
//     //               onClick={() => setIncrease()}
//     //             >
//     //               +
//     //             </button>
//     //             <span className="p-3 border-2">{amount}</span>
//     //             <button
//     //               className="btn btn-outline p-3 border-2 m-2"
//     //               onClick={() => setDecrease()}
//     //             >
//     //               -
//     //             </button>
//     //           </p>

//     //           <button className="btn btn-outline  my-2">Add To Cart</button>
//     //           <br />
//     //           <button className="btn btn-outline  my-2">Add To Wishlist</button>
//     //           <br />
//     //           <button className="btn btn-outline  my-2">Ask a Question</button>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// };

// export default WeddingShopSingleItem;
//!
import React, { useEffect } from "react";
import WeddingShopSingleItemCard from "./WeddingShopSingleItemCard";
import { useParams } from "react-router-dom";

const WeddingShopSingleItem = ({ detail, setDetail }) => {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetching the specific wedding product details by ID
      fetch(`http://localhost:5000/weddingShop/${id}`)
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
