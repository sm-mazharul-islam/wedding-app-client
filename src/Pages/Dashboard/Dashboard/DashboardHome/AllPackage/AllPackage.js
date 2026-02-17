import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2, Loader2, PackageSearch, Search, X } from "lucide-react";
import Swal from "sweetalert2";

const AllPackage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Data Fetching (with 15s auto-refresh)
  const {
    data: packages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/servicesPackage");
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    },
    refetchInterval: 15000,
  });

  // 2. Search Logic
  const filteredPackages = packages.filter((pkg) =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 3. Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      html: `
        <style>
          .swal2-confirm { background-color: #1A1D1F !important; transition: 0.3s; border-radius: 15px !important; }
          .swal2-confirm:hover { background-color: #db2777 !important; }
          .swal2-cancel { background-color: #f3f4f6 !important; color: #4b5563 !important; transition: 0.3s; border-radius: 15px !important; }
          .swal2-cancel:hover { background-color: #db2777 !important; color: white !important; }
        </style>
        This record will be permanently removed from admin logs.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "No, Keep it",
      customClass: { popup: "rounded-[40px]" },
    })

      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:5000/servicesPackage/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount > 0) {
                Swal.fire(
                  "Deleted!",
                  "The package has been removed.",
                  "success",
                );
                refetch();
              }
            })
            .catch((err) => {
              console.error("Delete Error:", err);
              Swal.fire("Error", "Could not connect to the server.", "error");
            });
        }
      });
  };

  // 4. Update Handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      priceOne: parseFloat(form.priceOne.value),
      image: Array.isArray(selectedPackage.image)
        ? [
            { ...selectedPackage.image[0], url: form.image.value },
            ...selectedPackage.image.slice(1),
          ]
        : form.image.value,
    };

    fetch(`http://localhost:5000/servicesPackage/${selectedPackage._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "Package details synced successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setSelectedPackage(null);
          refetch();
        }
      })
      .catch((err) => Swal.fire("Error", "Update failed.", "error"));
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-[#F8F9FA]">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-gray-500 font-medium tracking-tight">
          Loading inventory...
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-10  min-h-screen">
      {/* Header & Search */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-[22px] text-primary">
            <PackageSearch size={32} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-[#1A1D1F] tracking-tight">
              Inventory
            </h1>
            <p className="text-gray-500 text-sm font-medium">
              Manage Service Packages
            </p>
          </div>
        </div>

        <div className="relative w-full md:w-96 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name..."
            className="input input-bordered w-full pl-12 h-14 rounded-[20px] bg-white border-none shadow-sm focus:ring-2 ring-primary/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X
                size={18}
                className="text-gray-400 hover:text-error transition-colors"
              />
            </button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- DESKTOP TABLE VIEW --- */}
        <div className="hidden md:block bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-6 pl-8 text-gray-400 uppercase text-[11px] tracking-widest font-bold">
                  #
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold">
                  Preview
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold">
                  Package Name
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold text-center">
                  Price
                </th>
                <th className="pr-8 text-gray-400 uppercase text-[11px] tracking-widest font-bold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredPackages.map((item, index) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="pl-8 text-gray-400 font-medium">
                    {index + 1}
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14 bg-gray-50 border border-gray-100 shadow-sm">
                        <img
                          src={
                            Array.isArray(item.image)
                              ? item.image[0].url
                              : item.image
                          }
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-[#1A1D1F] text-base">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono mt-0.5 uppercase tracking-tighter">
                      UID: {item._id.slice(-10)}
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="text-primary font-black text-lg">
                      ${item.priceOne}
                    </span>
                  </td>
                  <td className="pr-8">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedPackage(item)}
                        className="btn btn-ghost btn-sm text-info hover:bg-info/10 rounded-xl"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10 rounded-xl"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- GORGEOUS MOBILE CARD VIEW --- */}
        <div className="md:hidden space-y-4">
          {filteredPackages.length === 0 && (
            <p className="text-center text-gray-400 py-10 italic">
              No packages match your search.
            </p>
          )}
          {filteredPackages.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-[28px] p-4 shadow-sm border border-gray-50 active:scale-[0.98] transition-transform"
            >
              <div className="flex gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-24 h-24 rounded-[22px] overflow-hidden border border-gray-100 shadow-inner">
                    <img
                      src={
                        Array.isArray(item.image)
                          ? item.image[0].url
                          : item.image
                      }
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-[#1A1D1F] text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                    ${item.priceOne}
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 py-1 overflow-hidden">
                  <div>
                    <h3 className="font-bold text-[#1A1D1F] text-lg leading-tight line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-mono mt-1 uppercase">
                      ID: {item._id.slice(-10)}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setSelectedPackage(item)}
                      className="flex-1 flex items-center justify-center gap-2 h-10 bg-[#F4F4F4] hover:bg-gray-200 text-[#1A1D1F] font-bold text-xs rounded-xl"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="w-12 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PREMIUM UPDATE MODAL --- */}
      {selectedPackage && (
        <div className="modal modal-open bg-black/40 backdrop-blur-md transition-all p-4">
          <div className="modal-box max-w-md rounded-[32px] p-8 bg-white shadow-2xl relative overflow-hidden">
            <button
              onClick={() => setSelectedPackage(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-error transition-colors"
            >
              <X size={24} />
            </button>

            <h3 className="font-black text-2xl mb-6 text-[#1A1D1F] border-b border-gray-100 pb-4 tracking-tight">
              Update Package
            </h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Package Name
                  </span>
                </label>
                <input
                  name="name"
                  defaultValue={selectedPackage.name}
                  className="input input-bordered rounded-xl h-12 font-medium"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Price (USD)
                  </span>
                </label>
                <input
                  name="priceOne"
                  type="number"
                  step="0.01"
                  defaultValue={selectedPackage.priceOne}
                  className="input input-bordered rounded-xl h-12 font-medium"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Image URL
                  </span>
                </label>
                <input
                  name="image"
                  defaultValue={
                    Array.isArray(selectedPackage.image)
                      ? selectedPackage.image[0].url
                      : selectedPackage.image
                  }
                  className="input input-bordered rounded-xl h-12 font-medium"
                  required
                />
              </div>

              <div className="modal-action grid grid-cols-2 gap-3 mt-10">
                <button
                  type="submit"
                  className="btn btn-primary h-12 rounded-[16px] border-none shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-ghost h-12 rounded-[16px] bg-gray-50 text-gray-500"
                  onClick={() => setSelectedPackage(null)}
                >
                  Cancel
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
