//!!

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2, Loader2, PackageSearch, Search, X } from "lucide-react";
import Swal from "sweetalert2";

const AllPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ১. ডাটা ফেচিং (অটো-রিফ্রেশ সহ)
  const {
    data: packages = [],
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      const res = await fetch(
        "https://wedding-app-server-eight.vercel.app/servicesPackage",
      );
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    },
    refetchInterval: 15000, // প্রতি ১৫ সেকেন্ডে ডাটা আপডেট হবে
  });

  // ২. সার্চ ফিল্টারিং লজিক
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ৩. ডিলিট হ্যান্ডলার
  const handleDelete = (id) => {
    if (!id) return Swal.fire("Error", "Valid ID required", "error");

    Swal.fire({
      title: "Are you sure?",
      text: "আপনি কি নিশ্চিতভাবে এই প্যাকেজটি মুছে ফেলতে চান?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
      cancelButtonText: "না",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://wedding-app-server-eight.vercel.app/servicesPackage/${id}`,
          {
            method: "DELETE",
          },
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "প্যাকেজটি সফলভাবে মুছে ফেলা হয়েছে।",
                "success",
              );
              refetch();
            }
          })
          .catch((err) => {
            console.error("Delete Error:", err);
            Swal.fire(
              "Error",
              "সার্ভারের সাথে সংযোগ বিচ্ছিন্ন হয়েছে।",
              "error",
            );
          });
      }
    });
  };

  // ৪. আপডেট হ্যান্ডলার
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      priceOne: parseFloat(form.priceOne.value),
      // ইমেজ যদি অ্যারে হয় তবে প্রথম ইনডেক্স আপডেট করার লজিক
      image: Array.isArray(selectedPackage.image)
        ? [
            { ...selectedPackage.image[0], url: form.image.value },
            ...selectedPackage.image.slice(1),
          ]
        : form.image.value,
    };

    fetch(
      `https://wedding-app-server-eight.vercel.app/servicesPackage/${selectedPackage._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedData),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "প্যাকেজটি সফলভাবে আপডেট করা হয়েছে।",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setSelectedPackage(null);
          refetch();
        }
      })
      .catch((err) => Swal.fire("Error", "আপডেট করা সম্ভব হয়নি।", "error"));
  };

  if (isLoading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-gray-500 font-medium">প্যাকেজগুলো লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 animate-in fade-in duration-700 bg-[#F8F9FA] min-h-screen">
      {/* Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <PackageSearch size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#1A1D1F] font-serif">
              Inventory Management
            </h2>
            <p className="text-gray-500 text-sm">
              প্যাকেজ এডিট বা রিমুভ করুন এখান থেকে।
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="প্যাকেজের নাম খুঁজুন..."
            className="input input-bordered w-full pl-10 bg-white shadow-sm rounded-xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200/50">
              <th>#</th>
              <th>Preview</th>
              <th>Package Name</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPackages.length > 0 ? (
              filteredPackages.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-base-200/30 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14 bg-gray-100">
                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0].url
                              : item.image
                          }
                          alt={item.name}
                          onError={(e) =>
                            (e.target.src =
                              "https://i.ibb.co/NTDwNc7/image.webp")
                          }
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-lg">{item.name}</div>
                    <div className="text-[10px] text-gray-400 font-mono tracking-tighter">
                      ID: {item._id}
                    </div>
                  </td>
                  <td className="text-primary font-bold text-lg">
                    ${item.priceOne}
                  </td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setSelectedPackage(item)}
                        className="btn btn-ghost btn-sm text-info hover:bg-info/10"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-400">
                  কোনো প্যাকেজ পাওয়া যায়নি।
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* --- EDIT MODAL --- */}
      {selectedPackage && (
        <div className="modal modal-open bg-black/50 backdrop-blur-md">
          <div className="modal-box max-w-lg rounded-[2rem] p-8 shadow-2xl">
            <h3 className="font-bold text-2xl mb-6 font-serif border-b pb-4 flex justify-between">
              প্যাকেজ আপডেট করুন
              <button
                onClick={() => setSelectedPackage(null)}
                className="text-gray-400 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </h3>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  প্যাকেজের নাম
                </label>
                <input
                  name="name"
                  defaultValue={selectedPackage.name}
                  className="input input-bordered bg-gray-50 rounded-xl"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  মূল্য (USD)
                </label>
                <input
                  name="priceOne"
                  type="number"
                  step="0.01"
                  defaultValue={selectedPackage.priceOne}
                  className="input input-bordered bg-gray-50 rounded-xl"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  ইমেজ ইউআরএল
                </label>
                <input
                  name="image"
                  defaultValue={
                    Array.isArray(selectedPackage.image)
                      ? selectedPackage.image[0].url
                      : selectedPackage.image
                  }
                  className="input input-bordered bg-base-100 rounded-xl"
                  required
                />
              </div>

              <div className="modal-action flex gap-3 mt-8">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 rounded-xl"
                >
                  সংরক্ষণ করুন
                </button>
                <button
                  type="button"
                  className="btn btn-ghost flex-1 rounded-xl"
                  onClick={() => setSelectedPackage(null)}
                >
                  বাতিল
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPackage;
