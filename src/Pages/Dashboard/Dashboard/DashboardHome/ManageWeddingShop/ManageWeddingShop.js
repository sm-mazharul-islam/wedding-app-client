// ManageWeddingShop.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2, Loader2, Store, Search } from "lucide-react";
import Swal from "sweetalert2";

const ManageWeddingShop = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ১. শপ ডাটা ফেচ করা
  const {
    data: shopItems = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["weddingShop"],
    queryFn: async () => {
      const res = await fetch(
        "https://wedding-app-server-eight.vercel.app/weddingShop",
      );
      if (!res.ok) throw new Error("Failed to load shop items");
      return res.json();
    },
  });

  // ২. ডিলিট হ্যান্ডলার
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from the shop permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://wedding-app-server-eight.vercel.app/weddingShop/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Item has been removed.", "success");
              refetch(); // টেবিল আপডেট করা
            }
          });
      }
    });
  };

  // ৩. আপডেট হ্যান্ডলার
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedInfo = {
      name: form.name.value,
      priceTwo: parseFloat(form.price.value),
      inStock: parseInt(form.stock.value),
    };

    fetch(
      `https://wedding-app-server-eight.vercel.app/weddingShop/${selectedItem._id}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updatedInfo),
      },
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Shop item synced successfully.", "success");
          setSelectedItem(null); // মোডাল বন্ধ করা
          refetch();
        }
      });
  };

  // সার্চ ফিল্টারিং
  const filteredItems = shopItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  return (
    <div className="p-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <Store size={32} />
          </div>
          <h1 className="text-3xl font-black text-[#1A1D1F] font-serif">
            Manage Wedding Shop
          </h1>
        </div>
        <div className="relative w-full md:w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search items..."
            className="input input-bordered w-full pl-10 rounded-xl"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* শপ আইটেম টেবিল */}
      <div className="overflow-x-auto bg-white rounded-[32px] shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200/50">
              <th>#</th>
              <th>Preview</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-base-200/30 transition-colors"
              >
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
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
                <td className="font-bold">{item.name}</td>
                <td className="text-primary font-bold">${item.priceTwo}</td>
                <td>
                  <span className="badge badge-ghost font-bold">
                    {item.inStock}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="btn btn-ghost btn-sm text-info"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-sm text-error"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- EDIT MODAL --- */}
      {selectedItem && (
        <div className="modal modal-open bg-black/40 backdrop-blur-sm">
          <div className="modal-box max-w-md rounded-[32px] p-8">
            <h3 className="font-bold text-2xl mb-6 font-serif border-b pb-4">
              Update Shop Item
            </h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  Item Name
                </label>
                <input
                  name="name"
                  defaultValue={selectedItem.name}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  Price ($)
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  defaultValue={selectedItem.priceTwo}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label text-xs font-bold uppercase text-gray-400">
                  Stock Quantity
                </label>
                <input
                  name="stock"
                  type="number"
                  defaultValue={selectedItem.inStock}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="modal-action gap-3 mt-6">
                <button type="submit" className="btn btn-primary px-8">
                  Sync Changes
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
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
