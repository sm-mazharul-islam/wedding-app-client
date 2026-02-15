// import { useQuery } from "@tanstack/react-query";
// import React from "react";
// import { useParams } from "react-router-dom";

// const SingleServices = () => {
//   const { _id } = useParams();

//   const { data: service = {}, isLoading } = useQuery({
//     queryKey: ["singleService", _id],
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:5000/servicesPackage/${_id}`);
//       return res.json();
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg text-pink-600"></span>
//       </div>
//     );
//   }

//   const {
//     name,
//     nameTwo,
//     price,
//     priceOne,
//     description,
//     descriptionTwo,
//     image,
//     headerImage,
//   } = service;

//   return (
//     <div className="bg-[#faf7f5]">
//       {/* ================= HERO HEADER ================= */}
//       <header
//         className="relative h-[45vh] w-full bg-cover bg-center"
//         style={{ backgroundImage: `url(${headerImage})` }}
//       >
//         <div className="absolute inset-0 bg-black/50"></div>

//         <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
//           <span className="uppercase tracking-[4px] text-pink-400 font-semibold">
//             Exclusive Services
//           </span>
//           <h1 className="text-white text-4xl md:text-6xl font-extrabold mt-4">
//             Make Your Day <span className="text-pink-500">Unforgettable</span>
//           </h1>
//           <p className="text-gray-200 max-w-2xl mt-6">
//             Choose from our beautifully crafted wedding packages designed for
//             elegance, comfort and luxury.
//           </p>
//         </div>
//       </header>

//       {/* ================= MAIN CONTENT ================= */}
//       <section className="max-w-[1440px] mx-auto px-4 py-20">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
//           {/* IMAGE SIDE */}
//           <div className="relative">
//             <img
//               src={image}
//               alt="service"
//               className="rounded-3xl shadow-2xl w-full object-cover"
//             />

//             <div className="absolute -bottom-6 left-6 bg-white px-6 py-3 rounded-full shadow-lg">
//               <span className="text-sm font-semibold text-gray-700">
//                 Premium Wedding Service
//               </span>
//             </div>
//           </div>

//           {/* DETAILS SIDE */}
//           <div className="space-y-10">
//             {/* STANDARD PACKAGE */}
//             <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition">
//               <span className="absolute -top-4 right-6 bg-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
//                 Popular
//               </span>

//               <h2 className="text-3xl font-bold text-gray-800">{name}</h2>

//               <p className="text-gray-600 mt-4 leading-relaxed">
//                 {description}
//               </p>

//               <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <span className="text-4xl font-extrabold text-pink-600">
//                   ${price}
//                 </span>

//                 <button className="px-8 py-3 rounded-full bg-pink-600 text-white font-semibold hover:bg-pink-700 transition">
//                   Book Standard
//                 </button>
//               </div>
//             </div>

//             {/* DIAMOND PACKAGE */}
//             <div className="relative bg-gradient-to-br from-[#ec4899] to-[#9333ea] rounded-3xl p-8 shadow-2xl text-white hover:scale-[1.02] transition">
//               <span className="absolute -top-4 right-6 bg-white text-pink-600 px-4 py-1 rounded-full text-sm font-bold">
//                 Luxury
//               </span>

//               <h2 className="text-3xl font-bold">{nameTwo}</h2>

//               <p className="mt-4 opacity-95 leading-relaxed">
//                 {descriptionTwo}
//               </p>

//               <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <span className="text-4xl font-extrabold">${priceOne}</span>

//                 <button className="px-8 py-3 rounded-full bg-white text-pink-600 font-semibold hover:bg-gray-100 transition">
//                   Book Diamond
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default SingleServices;
//!

import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthProvider";

const SingleServices = () => {
  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { data: service = {}, isLoading } = useQuery({
    queryKey: ["singleService", _id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/servicesPackage/${_id}`);
      if (!res.ok) throw new Error("Service not found");
      return res.json();
    },
  });

  const handleBookingClick = async (packageName, packagePrice) => {
    if (!user?.email) {
      Swal.fire({
        title: "Login Required",
        text: "Please sign in to book your favorite package!",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        confirmButtonColor: "#1A1D1F",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login");
      });
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    const { value: formValues } = await Swal.fire({
      title: `<h2 class="text-2xl font-black uppercase italic tracking-tighter">Booking <span class="text-rose-500">Form</span></h2>`,
      html: `
        <style>
          .swal-custom-btn { background-color: #1A1D1F !important; color: white !important; border-radius: 16px !important; padding: 12px 30px !important; font-weight: 900 !important; text-transform: uppercase !important; transition: 0.3s !important; border: none !important; }
          .swal-custom-btn:hover { background-color: #db2777 !important; transform: scale(1.05); }
        </style>
        <div class="space-y-4 text-left p-2">
          <div class="mb-4">
            <label class="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">Preferred Event Date</label>
            <input id="swal-input1" type="date" min="${today}" class="w-full px-5 py-3 bg-stone-100 border-none rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-rose-500/20">
          </div>
          
          <div class="mb-4">
            <label class="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">Select Time Slot</label>
            <select id="swal-input-slot" class="w-full px-5 py-3 bg-stone-100 border-none rounded-2xl outline-none font-bold text-sm focus:ring-2 focus:ring-rose-500/20">
              <option value="Morning">Morning (8:00 AM - 12:00 PM)</option>
              <option value="Noon">Noon (12:00 PM - 3:00 PM)</option>
              <option value="Afternoon">Afternoon (3:00 PM - 6:00 PM)</option>
              <option value="Evening">Evening (6:00 PM - 11:00 PM)</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">Contact Number</label>
            <input id="swal-input2" type="tel" placeholder="+880 1XXX-XXXXXX" class="w-full px-5 py-3 bg-stone-100 border-none rounded-2xl outline-none font-bold text-sm">
          </div>
          
          <div>
            <label class="block text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2 ml-1">Guest Capacity</label>
            <input id="swal-input3" type="number" placeholder="e.g. 200" class="w-full px-5 py-3 bg-stone-100 border-none rounded-2xl outline-none font-bold text-sm">
          </div>
        </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirm & Book",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-[40px] p-8",
        confirmButton: "swal-custom-btn mx-2",
        cancelButton:
          "px-8 py-3 bg-stone-100 text-stone-400 rounded-2xl font-bold uppercase text-xs mx-2 hover:bg-stone-200 transition-all",
      },
      preConfirm: () => {
        const date = document.getElementById("swal-input1").value;
        const slot = document.getElementById("swal-input-slot").value;
        const phone = document.getElementById("swal-input2").value;
        const guests = document.getElementById("swal-input3").value;

        if (!date || !phone || !guests) {
          Swal.showValidationMessage("All fields are mandatory!");
          return false;
        }
        return {
          eventDate: date,
          timeSlot: slot,
          phone: phone,
          guestCount: guests,
        };
      },
    });

    if (formValues) {
      const bookingData = {
        packageName,
        price: packagePrice,
        packageImage: service.image,
        userEmail: user.email,
        userName: user.displayName || "Anonymous Client",
        ...formValues,
        bookingDate: new Date(),
        status: "Pending",
      };

      try {
        const res = await fetch("http://localhost:5000/bookings", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(bookingData),
        });

        if (res.ok) {
          Swal.fire({
            title: "Success!",
            text:
              "Your request with " +
              formValues.timeSlot +
              " slot has been logged.",
            icon: "success",
            confirmButtonColor: "#black",
            customClass: { popup: "rounded-[40px]" },
            timer: 3000, // ৩ সেকেন্ড পর অটো বন্ধ হবে
            timerProgressBar: true, // নিচে একটি প্রগ্রেস বার দেখাবে
            showConfirmButton: true,
          });
        }
      } catch (err) {
        Swal.fire("Error", "Could not connect to the server", "error");
      }
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-stone-50">
        <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  const {
    name,
    nameTwo,
    price,
    priceOne,
    description,
    descriptionTwo,
    image,
    headerImage,
  } = service;

  return (
    <div className="bg-[#faf7f5] text-left min-h-screen">
      <header
        className="relative h-[50vh] w-full bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <div className="absolute inset-0 bg-stone-900/60"></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 text-white">
          <span className="uppercase tracking-[6px] text-rose-400 font-black text-[10px] mb-4">
            Registry Service
          </span>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
            Modern <span className="text-rose-500">Elegance</span>
          </h1>
        </div>
      </header>

      <section className="max-w-[1300px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <img
              src={image}
              className="relative rounded-[45px] shadow-2xl w-full h-[500px] object-cover border-8 border-white"
              alt="service"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-white border border-stone-100 rounded-[45px] p-10 shadow-xl">
              <h2 className="text-3xl font-black italic uppercase text-stone-800">
                {name}
              </h2>
              <p className="text-stone-400 mt-4 font-medium mb-10">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-stone-50">
                <span className="text-4xl font-black text-rose-500">
                  ${price}
                </span>
                <button
                  onClick={() => handleBookingClick(name, price)}
                  className="px-12 py-5 rounded-2xl bg-stone-900 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-rose-600 transition-all shadow-xl"
                >
                  Book Standard
                </button>
              </div>
            </div>

            <div className="bg-[#1A1D1F] rounded-[45px] p-10 shadow-2xl">
              <h2 className="text-3xl font-black italic uppercase text-white">
                {nameTwo}
              </h2>
              <p className="text-stone-500 mt-4 font-medium mb-10">
                {descriptionTwo}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-8 border-t border-stone-800">
                <span className="text-4xl font-black text-white">
                  ${priceOne}
                </span>
                <button
                  onClick={() => handleBookingClick(nameTwo, priceOne)}
                  className="px-12 py-5 rounded-2xl bg-white text-stone-900 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-rose-600 hover:text-white transition-all shadow-xl"
                >
                  Book Diamond
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleServices;
