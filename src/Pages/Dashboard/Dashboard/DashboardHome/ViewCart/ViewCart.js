import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import sealImg from "../../../../../Images/sealwp.png";
import signImg from "../../../../../Images/signwp.png";
import {
  Trash2,
  ShoppingBag,
  ReceiptText,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const userCartKey = user ? `cart_${user.uid}` : null;

  // --- PDF রশিদ জেনারেশন লজিক ---
  const generatePDF = (items, total) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // ইনভয়েস হেডার
    doc.setFontSize(22);
    doc.setTextColor(26, 29, 31);
    doc.text("OFFICIAL PURCHASE RECEIPT", pageWidth / 2, 20, {
      align: "center",
    });

    // কাস্টমার ডিটেইলস
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Customer: ${user?.displayName || "Valued Customer"}`, 14, 35);
    doc.text(`Email: ${user?.email}`, 14, 41);
    doc.text(`Date: ${new Date().toLocaleString()}`, 14, 47);
    doc.text(`Order ID: #ORD-${Date.now().toString().slice(-6)}`, 14, 53);

    // টেবিল ডাটা তৈরি
    const tableColumn = ["Product Name", "Unit Price", "Qty", "Total"];
    const tableRows = items.map((item) => [
      item.name || item.packageName || "Untitled Product",
      `$${item.priceOne || item.price || 0}`,
      item.quantity || 1,
      `$${((item.priceOne || item.price || 0) * (item.quantity || 1)).toFixed(2)}`,
    ]);

    // AutoTable জেনারেশন
    autoTable(doc, {
      startY: 60,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [26, 29, 31], textColor: [255, 255, 255] },
      styles: { fontSize: 9 },
    });

    // টেবিলের শেষ সীমানা নির্ধারণ
    let finalY = doc.lastAutoTable.finalY + 10;

    // গ্র্যান্ড টোটাল
    doc.setFontSize(12);
    doc.setTextColor(26, 29, 31);
    doc.setFont(undefined, "bold");
    doc.text(`Grand Total: $${total.toFixed(2)}`, 196, finalY, {
      align: "right",
    });

    finalY += 20; // সিগনেচারের জন্য স্পেস

    // --- সিগনেচার ও সিল সেকশন ---
    // স্বাক্ষর (Signature) - বাম পাশে
    try {
      doc.addImage(signImg, "PNG", 14, finalY, 40, 15);
    } catch (e) {
      console.warn("Signature image load failed");
    }

    doc.setDrawColor(200);
    doc.line(14, finalY + 16, 70, finalY + 16);
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.text("Authorized Signature", 14, finalY + 22);

    // সিল (Seal) - ডান পাশে
    try {
      doc.addImage(sealImg, "PNG", pageWidth - 50, finalY - 5, 30, 30);
    } catch (e) {
      console.warn("Seal image load failed");
    }

    // ফুটার
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      "This is a computer-generated receipt.",
      pageWidth / 2,
      finalY + 40,
      { align: "center" },
    );

    // PDF সেভ
    doc.save(`Receipt_${user?.displayName || "User"}_${Date.now()}.pdf`);
  };

  const loadCart = () => {
    if (userCartKey) {
      const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
      setCartItems(data);
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
    const updatedCart = cartItems.filter(
      (item) => (item._id || item.id) !== id,
    );
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleCheckout = async () => {
    try {
      if (cartItems.length === 0) return;

      const checkoutTotal = cartItems.reduce(
        (acc, item) =>
          acc + (item.priceOne || item.price || 0) * (item.quantity || 1),
        0,
      );

      // ১. স্টক আপডেট
      const updatePromises = cartItems.map((item) => {
        const targetId = item.productId || item._id || item.id;
        return fetch(`http://localhost:5000/servicesPackage/${targetId}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity }),
        });
      });
      await Promise.all(updatePromises);

      // ২. অর্ডার সেভ
      await fetch("http://localhost:5000/cart", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: user?.email,
          cartItems: cartItems,
          totalAmount: checkoutTotal,
          date: new Date(),
        }),
      });

      // ৩. PDF জেনারেশন
      generatePDF(cartItems, checkoutTotal);

      // ৪. ক্লিনিং
      localStorage.removeItem(userCartKey);
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));
      queryClient.invalidateQueries(["servicesPackage"]);

      Swal.fire({
        title: "Order Successful!",
        text: "Your official receipt has been downloaded.",
        icon: "success",
        confirmButtonColor: "#1A1D1F",
      });
    } catch (err) {
      Swal.fire("Error", "Checkout failed.", "error");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) =>
      acc + (item.priceOne || item.price || 0) * (item.quantity || 1),
    0,
  );

  if (!user)
    return (
      <div className="p-20 text-center text-gray-400">
        Please login to view cart.
      </div>
    );
  if (cartItems.length === 0)
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <ShoppingCart size={64} className="text-stone-200" />
        <h2 className="text-2xl font-black text-stone-300 uppercase italic">
          Your cart is empty
        </h2>
      </div>
    );

  return (
    <div className="p-4 lg:p-12 bg-white min-h-screen text-left font-sans text-[#1A1D1F]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-16 italic tracking-tighter uppercase flex items-center gap-4">
          Shopping{" "}
          <span className="text-rose-500 underline decoration-stone-100 underline-offset-8">
            Cart
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="overflow-hidden rounded-[40px] border border-stone-100 shadow-sm">
              <table className="table w-full border-collapse">
                <thead className="bg-[#1A1D1F] text-white">
                  <tr>
                    <th className="py-8 pl-10 text-left uppercase tracking-widest text-[10px]">
                      Product Info
                    </th>
                    <th className="text-left uppercase tracking-widest text-[10px]">
                      Price
                    </th>
                    <th className="text-left uppercase tracking-widest text-[10px]">
                      Qty
                    </th>
                    <th className="text-left uppercase tracking-widest text-[10px]">
                      Total
                    </th>
                    <th className="pr-10 text-right uppercase tracking-widest text-[10px]">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {cartItems.map((item, index) => {
                    const imgUrl = Array.isArray(item.image)
                      ? item.image[0]
                      : item.image || "https://i.ibb.co/NTDwNc7/image.webp";
                    const price = item.priceOne || item.price || 0;
                    return (
                      <tr
                        key={item._id || index}
                        className="group hover:bg-stone-50/50 transition-colors"
                      >
                        <td className="py-6 pl-10">
                          <div className="flex items-center gap-5">
                            <img
                              src={imgUrl}
                              className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-4 ring-stone-50"
                              alt=""
                            />
                            <span className="font-black text-lg italic uppercase tracking-tighter text-stone-800">
                              {item.name || item.packageName}
                            </span>
                          </div>
                        </td>
                        <td className="font-bold text-stone-600">${price}</td>
                        <td>
                          <span className="px-4 py-1.5 bg-stone-100 rounded-xl font-black text-xs">
                            {item.quantity}
                          </span>
                        </td>
                        <td className="font-black text-rose-500">
                          ${(price * item.quantity).toFixed(2)}
                        </td>
                        <td className="pr-10 text-right">
                          <button
                            onClick={() => removeItem(item._id || item.id)}
                            className="p-3 text-stone-300 hover:text-rose-500 rounded-2xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="relative">
            <div className="bg-stone-50 p-10 rounded-[50px] border border-stone-100 sticky top-28 shadow-xl">
              <h3 className="text-2xl font-black mb-8 uppercase italic flex items-center gap-3">
                <ReceiptText size={24} className="text-rose-500" /> Summary
              </h3>
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-stone-400 font-bold uppercase text-[10px]">
                  <span>Total Items</span>
                  <span>{cartItems.length} items</span>
                </div>
                <div className="flex justify-between items-end border-t border-stone-200 pt-6">
                  <span className="font-black text-stone-800 uppercase italic">
                    Grand Total
                  </span>
                  <span className="text-4xl font-black tracking-tighter text-[#1A1D1F]">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#1A1D1F] text-white py-6 rounded-[30px] font-black uppercase text-xs hover:bg-rose-600 shadow-2xl transition-all"
              >
                Complete Checkout
              </button>
              <p className="mt-8 text-[9px] text-stone-400 font-black uppercase text-center">
                Receipt with signature & seal <br /> will be generated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
