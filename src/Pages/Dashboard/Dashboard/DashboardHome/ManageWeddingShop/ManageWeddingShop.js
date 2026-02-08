import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Edit,
  Trash2,
  Loader2,
  Store,
  Search,
  Package,
  Plus,
} from "lucide-react";
import Swal from "sweetalert2";

const ManageWeddingShop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. Fetch Data
  const {
    data: shopItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["weddingShop"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/weddingShop");
      if (!res.ok) throw new Error("Failed to load shop items");
      return res.json();
    },
  });

  // 2. Delete Handler
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      background: "#ffffff",
      customClass: {
        popup: "rounded-[24px]",
        confirmButton: "rounded-xl px-6 py-3",
        cancelButton: "rounded-xl px-6 py-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/weddingShop/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item removed.", "success");
              refetch();
            }
          });
      }
    });
  };

  // 3. Update Handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedInfo = {
      name: form.name.value,
      priceTwo: parseFloat(form.price.value),
      inStock: parseInt(form.stock.value),
    };

    fetch(`http://localhost:5000/weddingShop/${selectedItem._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Shop item synced successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
          setSelectedItem(null);
          refetch();
        }
      });
  };

  const filteredItems = shopItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="animate-spin text-primary" size={48} />
          <p className="text-gray-500 font-medium animate-pulse">
            Loading Shop Inventory...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-4 md:p-10 bg-[#F9FAFB] min-h-screen font-sans">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-white shadow-sm border border-gray-100 rounded-[22px] text-primary">
              <Store size={32} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#1A1D1F] tracking-tight">
                Manage Shop
              </h1>
              <p className="text-gray-500 text-sm font-medium">
                Manage your wedding inventory and stock
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
              placeholder="Search by product name..."
              className="input input-bordered w-full pl-12 h-14 rounded-[20px] bg-white border-none shadow-sm focus:ring-2 ring-primary/20 transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- DESKTOP TABLE VIEW --- */}
        <div className="hidden md:block bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="py-6 pl-8 text-gray-400 uppercase text-[11px] tracking-widest font-bold">
                  Preview
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold">
                  Product Details
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold text-center">
                  Price
                </th>
                <th className="text-gray-400 uppercase text-[11px] tracking-widest font-bold text-center">
                  Status
                </th>
                <th className="pr-8 text-gray-400 uppercase text-[11px] tracking-widest font-bold text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="pl-8 py-4">
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
                    <div>
                      <div className="font-bold text-[#1A1D1F] text-base">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-400 font-medium mt-0.5">
                        ID: {item._id.slice(-6)}
                      </div>
                    </div>
                  </td>
                  <td className="text-center font-black text-gray-700">
                    ${item.priceTwo}
                  </td>
                  <td className="text-center">
                    {item.inStock > 0 ? (
                      <span className="badge badge-success badge-outline gap-2 font-bold text-[10px] px-3 py-3">
                        {item.inStock} Available
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline gap-2 font-bold text-[10px] px-3 py-3">
                        Out of Stock
                      </span>
                    )}
                  </td>
                  <td className="pr-8">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedItem(item)}
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
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="relative bg-white rounded-[28px] p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-white active:scale-[0.98] transition-transform"
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
                    ${item.priceTwo}
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-bold text-[#1A1D1F] text-lg leading-tight line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${item.inStock > 0 ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"}`}
                      >
                        {item.inStock > 0 && (
                          <span className="w-1 h-1 rounded-full bg-green-600 animate-pulse"></span>
                        )}
                        {item.inStock > 0
                          ? `${item.inStock} In Stock`
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 flex items-center justify-center gap-2 h-10 bg-[#F4F4F4] hover:bg-gray-200 text-[#1A1D1F] font-bold text-xs rounded-xl"
                    >
                      <Edit size={14} strokeWidth={3} /> Edit
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

      {/* --- PREMIUM EDIT MODAL --- */}
      {selectedItem && (
        <div className="modal modal-open bg-black/40 backdrop-blur-md transition-all p-4">
          <div className="modal-box max-w-md rounded-[32px] p-8 bg-white shadow-2xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <h3 className="font-black text-2xl mb-6 text-[#1A1D1F] border-b border-gray-100 pb-4">
              Edit Product
            </h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div className="form-control">
                <label className="label py-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                    Product Name
                  </span>
                </label>
                <input
                  name="name"
                  defaultValue={selectedItem.name}
                  className="input input-bordered rounded-xl h-12 font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label py-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Price ($)
                    </span>
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={selectedItem.priceTwo}
                    className="input input-bordered rounded-xl h-12 font-medium"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label py-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                      Stock Level
                    </span>
                  </label>
                  <input
                    name="stock"
                    type="number"
                    defaultValue={selectedItem.inStock}
                    className="input input-bordered rounded-xl h-12 font-medium"
                    required
                  />
                </div>
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
                  onClick={() => setSelectedItem(null)}
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

export default ManageWeddingShop;
