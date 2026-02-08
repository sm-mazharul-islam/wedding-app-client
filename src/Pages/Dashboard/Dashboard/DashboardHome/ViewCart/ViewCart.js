// import React, { useState, useEffect, useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../../../contexts/AuthProvider";
// import { useQueryClient } from "@tanstack/react-query"; // 1. Import QueryClient

// const ViewCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient(); // 2. Initialize QueryClient

//   const userCartKey = user ? `cart_${user.uid}` : null;

//   const loadCart = () => {
//     if (userCartKey) {
//       const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
//       setCartItems(data);
//     } else {
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//     window.addEventListener("storage", loadCart);
//     window.addEventListener("cartUpdated", loadCart);

//     return () => {
//       window.removeEventListener("storage", loadCart);
//       window.removeEventListener("cartUpdated", loadCart);
//     };
//   }, [userCartKey]);

//   const removeItem = (id) => {
//     if (!userCartKey) return;
//     const updatedCart = cartItems.filter((item) => item.id !== id);
//     localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };
//   const handleCheckout = async () => {
//     try {
//       // 1. Send the update to the database
//       const updatePromises = cartItems.map((item) =>
//         fetch(`http://localhost:5000/servicesPackage/${item.id}`, {
//           method: "PATCH",
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify({ quantity: item.quantity }),
//         }),
//       );
//       await Promise.all(updatePromises);

//       // 2. FORCE THE REFRESH
//       // This makes the "5 Items" update to the new number instantly
//       queryClient.invalidateQueries(["servicesPackage"]);

//       // 3. Clear the cart
//       localStorage.removeItem(userCartKey);
//       setCartItems([]);
//       window.dispatchEvent(new Event("cartUpdated"));

//       Swal.fire("Success", "Stock updated!", "success");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );

//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
//         <h2 className="text-3xl font-serif font-bold text-gray-400">
//           Please login to view your cart
//         </h2>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
//         <h2 className="text-3xl font-serif font-bold text-gray-400">
//           Your cart is empty
//         </h2>
//         <p className="mt-2 text-gray-500">
//           Add some beautiful wedding items to see them here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 lg:p-10 bg-base-100 min-h-screen">
//       <h2 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="lg:col-span-2 overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="hover:bg-base-200 transition-colors"
//                 >
//                   <td>
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-16 h-16">
//                           <img src={item.image} alt={item.name} />
//                         </div>
//                       </div>
//                       <div className="font-bold text-lg">{item.name}</div>
//                     </div>
//                   </td>
//                   <td className="font-medium">${item.price}</td>
//                   <td>
//                     <span className="badge badge-ghost font-bold p-3">
//                       {item.quantity}
//                     </span>
//                   </td>
//                   <td className="font-bold text-primary">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="btn btn-error btn-xs btn-outline"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="bg-base-200 p-8 rounded-2xl h-fit sticky top-24">
//           <h3 className="text-2xl font-bold mb-6">Summary</h3>
//           <div className="flex justify-between mb-4 border-b border-gray-300 pb-2">
//             <span>Total Items:</span>
//             <span className="font-bold">{cartItems.length}</span>
//           </div>
//           <div className="flex justify-between text-2xl font-bold mt-6 mb-8">
//             <span>Subtotal:</span>
//             <span className="text-primary">${subtotal.toFixed(2)}</span>
//           </div>
//           <button
//             onClick={handleCheckout}
//             className="btn btn-primary w-full btn-lg shadow-xl shadow-primary/20"
//           >
//             Checkout Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCart;
//!
// import React, { useState, useEffect, useContext } from "react";
// import Swal from "sweetalert2";
// import { useQueryClient } from "@tanstack/react-query";
// import { AuthContext } from "../../../../../contexts/AuthProvider";

// const ViewCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // User-er unique ID diye LocalStorage key toiri kora
//   const userCartKey = user ? `cart_${user.uid}` : null;

//   // LocalStorage theke cart data load kora
//   const loadCart = () => {
//     if (userCartKey) {
//       const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
//       setCartItems(data);
//     } else {
//       setCartItems([]);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//     window.addEventListener("storage", loadCart);
//     window.addEventListener("cartUpdated", loadCart);

//     return () => {
//       window.removeEventListener("storage", loadCart);
//       window.removeEventListener("cartUpdated", loadCart);
//     };
//   }, [userCartKey]);

//   // Cart theke item remove kora
//   const removeItem = (id) => {
//     if (!userCartKey) return;
//     const updatedCart = cartItems.filter((item) => item.id !== id);
//     localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   // Checkout Handle kora (Database Sync ebong Stock Update)
//   const handleCheckout = async () => {
//     try {
//       // 1. Backend-e Stock update kora
//       const updatePromises = cartItems.map((item) =>
//         fetch(`http://localhost:5000/servicesPackage/${item.id}`, {
//           method: "PATCH",
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify({ quantity: item.quantity }),
//         }),
//       );
//       await Promise.all(updatePromises);

//       // 2. Dashboard update korar jonno cart data database-e pathano
//       await fetch("http://localhost:5000/cart", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           email: user?.email, // Dashboard stats eiti use korbe
//           cartItems: cartItems,
//         }),
//       });

//       // 3. UI refresh ebong cleanup
//       queryClient.invalidateQueries(["servicesPackage"]);
//       localStorage.removeItem(userCartKey);
//       setCartItems([]);
//       window.dispatchEvent(new Event("cartUpdated"));

//       Swal.fire({
//         title: "Success!",
//         text: "Order placed successfully! Dashboard updated.",
//         icon: "success",
//         confirmButtonColor: "#1A1D1F",
//       });
//     } catch (err) {
//       console.error("Checkout Error:", err);
//       Swal.fire("Error", "Could not complete checkout", "error");
//     }
//   };

//   const subtotal = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0,
//   );

//   if (!user) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh]">
//         <h2 className="text-2xl font-bold text-gray-400">
//           Please login to view cart
//         </h2>
//       </div>
//     );
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh]">
//         <h2 className="text-2xl font-bold text-gray-400">Your cart is empty</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 lg:p-10 bg-base-100 min-h-screen">
//       <h2 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         <div className="lg:col-span-2 overflow-x-auto">
//           <table className="table w-full">
//             <thead className="bg-base-200">
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Total</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartItems.map((item) => (
//                 <tr
//                   key={item.id}
//                   className="hover:bg-base-200 transition-colors"
//                 >
//                   <td>
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-16 h-16">
//                           <img src={item.image} alt={item.name} />
//                         </div>
//                       </div>
//                       <div className="font-bold">{item.name}</div>
//                     </div>
//                   </td>
//                   <td>${item.price}</td>
//                   <td>{item.quantity}</td>
//                   <td className="font-bold text-primary">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="btn btn-error btn-xs btn-outline"
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Order Summary Section */}
//         <div className="bg-base-200 p-8 rounded-2xl h-fit">
//           <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
//           <div className="flex justify-between mb-4 border-b pb-2">
//             <span>Subtotal:</span>
//             <span className="font-bold">${subtotal.toFixed(2)}</span>
//           </div>
//           <button
//             onClick={handleCheckout}
//             className="btn btn-primary w-full btn-lg shadow-xl"
//           >
//             Checkout Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewCart;
//!!
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Unique LocalStorage key based on user ID
  const userCartKey = user ? `cart_${user.uid}` : null;

  // Load cart from LocalStorage
  const loadCart = () => {
    if (userCartKey) {
      const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
      setCartItems(data);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userCartKey]);

  // Remove Item Logic
  const removeItem = (id) => {
    if (!userCartKey) return;
    // Filters by both id types for safety
    const updatedCart = cartItems.filter(
      (item) => (item._id || item.id) !== id,
    );
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // Main Checkout Logic
  const handleCheckout = async () => {
    try {
      // ১. ফিল্টার লজিক আপডেট: productId অথবা _id থাকতে হবে
      const validItems = cartItems.filter(
        (item) => item.productId || item._id || item.id,
      );

      if (validItems.length === 0) {
        return Swal.fire({
          title: "Invalid Cart Data",
          text: "Please clear your cart and add items again to ensure they have valid IDs.",
          icon: "warning",
        });
      }

      // ২. UPDATE STOCK: ইনভেন্টরি আপডেট করা
      const updatePromises = validItems.map((item) => {
        // Priority: ১. productId (নতুন লজিক), ২. _id (MongoDB)
        const targetId = item.productId || item._id || item.id;

        if (!targetId || targetId === "undefined") {
          console.warn(`Skipping item due to missing ID: ${item.packageName}`);
          return Promise.resolve();
        }

        return fetch(`http://localhost:5000/servicesPackage/${targetId}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity }),
        }).then((res) => {
          if (!res.ok)
            throw new Error(`Stock update failed for ${item.packageName}`);
          return res.json();
        });
      });

      await Promise.all(updatePromises);

      //

      // ৩. DATABASE SYNC: ড্যাশবোর্ড আপডেট করার জন্য ডাটাবেজে পাঠানো
      const syncResponse = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          cartItems: validItems, // শুধুমাত্র ভ্যালিড আইটেমগুলো পাঠানো হচ্ছে
        }),
      });

      if (!syncResponse.ok)
        throw new Error("Dashboard synchronization failed.");

      // ৪. CLEANUP: লোকাল স্টোরেজ ক্লিয়ার এবং UI রিফ্রেশ
      queryClient.invalidateQueries(["servicesPackage"]);
      if (userCartKey) {
        localStorage.removeItem(userCartKey);
      }
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        title: "Success!",
        text: "Inventory updated and Dashboard synced successfully!",
        icon: "success",
        confirmButtonColor: "#1A1D1F",
      });
    } catch (err) {
      console.error("Checkout Error:", err);
      Swal.fire({
        title: "Checkout Failed",
        text: err.message || "Please check if the backend server is running.",
        icon: "error",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-400">
          Please login to view cart
        </h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-400">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-4xl font-serif font-bold mb-8 text-[#1A1D1F]">
        Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Table */}
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={item.productId || item._id || index}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img
                            src={
                              item.image ||
                              "https://i.ibb.co/NTDwNc7/image.webp"
                            }
                            alt={item.name}
                          />
                        </div>
                      </div>
                      <div className="font-bold text-lg">{item.name}</div>
                    </div>
                  </td>
                  <td className="font-medium">${item.price}</td>
                  <td>
                    <span className="badge badge-ghost font-bold">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => removeItem(item._id || item.id)}
                      className="btn btn-error btn-xs btn-outline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Summary */}
        <div className="bg-base-200 p-8 rounded-2xl h-fit sticky top-24">
          <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
          <div className="flex justify-between mb-4 border-b border-gray-300 pb-2">
            <span>Total Items:</span>
            <span className="font-bold">{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold mt-6 mb-8">
            <span>Subtotal:</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="btn btn-primary w-full btn-lg shadow-xl shadow-primary/20"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
