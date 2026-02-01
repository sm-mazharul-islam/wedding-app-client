import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const AllPackage = () => {
  // selectedPackage will hold the data of the item being edited
  const [selectedPackage, setSelectedPackage] = useState(null);

  // 1. Fetching Data
  const {
    data: packages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      console.log("Fetching packages from backend...");
      const res = await fetch("http://localhost:5000/servicesPackage");
      if (!res.ok) throw new Error("Failed to fetch packages");
      return res.json();
    },
  });

  // 2. DELETE HANDLER
  const handleDelete = (id) => {
    console.log("Attempting to delete ID:", id);
    if (!id) return console.error("No ID found for deletion!");

    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently remove the package.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/servicesPackage/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Delete response:", data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Package removed.", "success");
              refetch(); // Instantly update UI
            }
          })
          .catch((err) => console.error("Delete Error:", err));
      }
    });
  };

  // 3. UPDATE (EDIT) HANDLER
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      priceOne: form.priceOne.value,
      image: form.image.value,
    };

    fetch(`http://localhost:5000/servicesPackage/${selectedPackage._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        // IMPORTANT: MongoDB update results look like this
        if (data.modifiedCount > 0 || data.matchedCount > 0) {
          Swal.fire({
            title: "Updated!",
            text: "The package has been updated.",
            icon: "success",
            timer: 1500, // This makes the alert disappear automatically
            showConfirmButton: false,
          });

          // This closes the modal automatically
          setSelectedPackage(null);

          // This refreshes the table data
          refetch();
        }
      })
      .catch((err) => console.error("Update Error:", err));
  };

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 font-serif">
        Manage All Packages
      </h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <th>{index + 1}</th>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td className="font-bold">{item.name}</td>
                <td className="text-primary font-semibold">${item.priceOne}</td>
                <td>
                  <div className="flex justify-center gap-3">
                    {/* EDIT BUTTON: Using a regular button instead of label to avoid toggle issues */}
                    <button
                      onClick={() => setSelectedPackage(item)}
                      className="btn btn-ghost btn-xs text-info flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-ghost btn-xs text-error flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- EDIT MODAL --- */}
      {selectedPackage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md">
            <h3 className="font-bold text-xl mb-4 font-serif">
              Update Package
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label font-semibold">Package Name</label>
                <input
                  name="name"
                  defaultValue={selectedPackage.name}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Price ($)</label>
                <input
                  name="priceOne"
                  defaultValue={selectedPackage.priceOne}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Image URL</label>
                <input
                  name="image"
                  defaultValue={selectedPackage.image}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
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
