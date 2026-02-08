// //!!
// import React, { useState, useEffect, useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../../../contexts/AuthProvider";
// import { useQueryClient } from "@tanstack/react-query";

// const ViewCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useContext(AuthContext);
//   const queryClient = useQueryClient();

//   // Unique LocalStorage key based on user ID
//   const userCartKey = user ? `cart_${user.uid}` : null;

//   // Load cart from LocalStorage
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

//   // Remove Item Logic
//   const removeItem = (id) => {
//     if (!userCartKey) return;
//     // Filters by both id types for safety
//     const updatedCart = cartItems.filter(
//       (item) => (item._id || item.id) !== id,
//     );
//     localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
//     setCartItems(updatedCart);
//     window.dispatchEvent(new Event("cartUpdated"));
//   };

//   // Main Checkout Logic
//   const handleCheckout = async () => {
//     try {
//       // ১. ফিল্টার লজিক আপডেট: productId অথবা _id থাকতে হবে
//       const validItems = cartItems.filter(
//         (item) => item.productId || item._id || item.id,
//       );

//       if (validItems.length === 0) {
//         return Swal.fire({
//           title: "Invalid Cart Data",
//           text: "Please clear your cart and add items again to ensure they have valid IDs.",
//           icon: "warning",
//         });
//       }

//       // ২. UPDATE STOCK: ইনভেন্টরি আপডেট করা
//       const updatePromises = validItems.map((item) => {
//         // Priority: ১. productId (নতুন লজিক), ২. _id (MongoDB)
//         const targetId = item.productId || item._id || item.id;

//         if (!targetId || targetId === "undefined") {
//           console.warn(`Skipping item due to missing ID: ${item.packageName}`);
//           return Promise.resolve();
//         }

//         return fetch(`http://localhost:5000/servicesPackage/${targetId}`, {
//           method: "PATCH",
//           headers: { "content-type": "application/json" },
//           body: JSON.stringify({ quantity: item.quantity }),
//         }).then((res) => {
//           if (!res.ok)
//             throw new Error(`Stock update failed for ${item.packageName}`);
//           return res.json();
//         });
//       });

//       await Promise.all(updatePromises);

//       //

//       // ৩. DATABASE SYNC: ড্যাশবোর্ড আপডেট করার জন্য ডাটাবেজে পাঠানো
//       const syncResponse = await fetch("http://localhost:5000/cart", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({
//           email: user?.email,
//           cartItems: validItems, // শুধুমাত্র ভ্যালিড আইটেমগুলো পাঠানো হচ্ছে
//         }),
//       });

//       if (!syncResponse.ok)
//         throw new Error("Dashboard synchronization failed.");

//       // ৪. CLEANUP: লোকাল স্টোরেজ ক্লিয়ার এবং UI রিফ্রেশ
//       queryClient.invalidateQueries(["servicesPackage"]);
//       if (userCartKey) {
//         localStorage.removeItem(userCartKey);
//       }
//       setCartItems([]);
//       window.dispatchEvent(new Event("cartUpdated"));

//       Swal.fire({
//         title: "Success!",
//         text: "Inventory updated and Dashboard synced successfully!",
//         icon: "success",
//         confirmButtonColor: "#1A1D1F",
//       });
//     } catch (err) {
//       console.error("Checkout Error:", err);
//       Swal.fire({
//         title: "Checkout Failed",
//         text: err.message || "Please check if the backend server is running.",
//         icon: "error",
//       });
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
//       <h2 className="text-4xl font-serif font-bold mb-8 text-[#1A1D1F]">
//         Shopping Cart
//       </h2>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//         {/* Cart Table */}
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
//               {cartItems.map((item, index) => (
//                 <tr
//                   key={item.productId || item._id || index}
//                   className="hover:bg-base-200 transition-colors"
//                 >
//                   <td>
//                     <div className="flex items-center gap-4">
//                       <div className="avatar">
//                         <div className="mask mask-squircle w-16 h-16">
//                           <img
//                             src={
//                               item.image ||
//                               "https://i.ibb.co/NTDwNc7/image.webp"
//                             }
//                             alt={item.name}
//                           />
//                         </div>
//                       </div>
//                       <div className="font-bold text-lg">{item.name}</div>
//                     </div>
//                   </td>
//                   <td className="font-medium">${item.price}</td>
//                   <td>
//                     <span className="badge badge-ghost font-bold">
//                       {item.quantity}
//                     </span>
//                   </td>
//                   <td className="font-bold text-primary">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </td>
//                   <td>
//                     <button
//                       onClick={() => removeItem(item._id || item.id)}
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

//         {/* Sidebar Summary */}
//         <div className="bg-base-200 p-8 rounded-2xl h-fit sticky top-24">
//           <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
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
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ইউজার আইডি অনুযায়ী লোকাল স্টোরেজ কী
  const userCartKey = user ? `cart_${user.uid}` : null;

  // --- PDF রশিদ জেনারেশন লজিক ---
  const generatePDF = (items, total) => {
    const doc = new jsPDF();

    // ইনভয়েস হেডার
    doc.setFontSize(22);
    doc.setTextColor(26, 29, 31); // #1A1D1F
    doc.text("PURCHASE RECEIPT", 105, 20, { align: "center" });

    // কাস্টমার ডিটেইলস
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Customer: ${user?.displayName || "Valued Customer"}`, 14, 35);
    doc.text(`Email: ${user?.email}`, 14, 42);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 49);
    doc.text(`Order ID: #ORD-${Date.now().toString().slice(-6)}`, 14, 56);

    // টেবিলের জন্য ডাটা ফরম্যাটিং
    const tableColumn = ["Product Name", "Unit Price", "Qty", "Total"];
    const tableRows = items.map((item) => [
      item.name,
      `$${item.price}`,
      item.quantity,
      `$${(item.price * item.quantity).toFixed(2)}`,
    ]);

    // autoTable ব্যবহার করে টেবিল তৈরি (Fix for 'is not a function')
    autoTable(doc, {
      startY: 65,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: {
        fillStyle: [26, 29, 31],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 80 },
        3: { halign: "right" },
      },
    });

    // গ্র্যান্ড টোটাল সেকশন
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFontSize(14);
    doc.setTextColor(26, 29, 31);
    doc.text(`Grand Total: $${total.toFixed(2)}`, 196, finalY, {
      align: "right",
    });

    // ফুটার মেসেজ
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Thank you for your business!", 105, finalY + 20, {
      align: "center",
    });

    // PDF ফাইল সেভ
    doc.save(`Receipt_${user?.displayName || "User"}_${Date.now()}.pdf`);
  };

  // কার্ট ডাটা লোড করা
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

  const removeItem = (id) => {
    if (!userCartKey) return;
    const updatedCart = cartItems.filter(
      (item) => (item._id || item.id) !== id,
    );
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // --- চেকআউট হ্যান্ডলার ---
  const handleCheckout = async () => {
    try {
      const validItems = cartItems.filter(
        (item) => item.productId || item._id || item.id,
      );

      if (validItems.length === 0) {
        return Swal.fire({ title: "Cart Empty", icon: "warning" });
      }

      const checkoutTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      // ১. স্টক আপডেট করা (PATCH)
      const updatePromises = validItems.map((item) => {
        const targetId = item.productId || item._id || item.id;
        return fetch(`http://localhost:5000/servicesPackage/${targetId}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity }),
        }).then((res) => {
          if (!res.ok) throw new Error("Stock update failed");
          return res.json();
        });
      });

      await Promise.all(updatePromises);

      // ২. ডাটাবেজে অর্ডার সেভ করা (POST)
      const syncResponse = await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          cartItems: validItems,
          totalAmount: checkoutTotal,
          date: new Date(),
        }),
      });

      if (!syncResponse.ok) throw new Error("Database sync failed");

      // ৩. PDF রশিদ জেনারেট এবং ডাউনলোড
      generatePDF(validItems, checkoutTotal);

      // ৪. ক্লিনিং লজিক
      queryClient.invalidateQueries(["servicesPackage"]);
      if (userCartKey) localStorage.removeItem(userCartKey);
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire({
        title: "Order Placed!",
        text: "Inventory updated and receipt downloaded.",
        icon: "success",
        confirmButtonColor: "#1A1D1F",
      });
    } catch (err) {
      Swal.fire({ title: "Error", text: err.message, icon: "error" });
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-2xl font-bold text-gray-400">
        Please login to view cart
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-2xl font-bold text-gray-400">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 bg-base-100 min-h-screen font-sans text-[#1A1D1F]">
      <h2 className="text-4xl font-black mb-8 italic tracking-tighter uppercase">
        Your Shopping Cart
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-[#1A1D1F] text-white">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={item.productId || item._id || index}
                  className="hover:bg-gray-50 border-b"
                >
                  <td className="font-bold">{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <span className="badge badge-ghost">{item.quantity}</span>
                  </td>
                  <td className="font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => removeItem(item._id || item.id)}
                      className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-[#FAF7F6] p-8 rounded-[32px] h-fit sticky top-24 border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black mb-6 uppercase tracking-widest">
            Order Summary
          </h3>
          <div className="flex justify-between text-3xl font-black mb-8">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="btn w-full bg-[#1A1D1F] hover:bg-black text-white rounded-2xl h-16 border-none shadow-xl transition-all active:scale-95"
          >
            Checkout & Get Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
