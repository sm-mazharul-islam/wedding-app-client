import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Edit3,
  Trash2,
  User,
  Search,
  MapPin,
  X,
  Info,
  Calendar,
} from "lucide-react";
import { useForm } from "react-hook-form";

const ManageBiodatas = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProfile, setEditingProfile] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { data: biodatas = [], isLoading } = useQuery({
    queryKey: ["all-biodatas"],
    queryFn: () =>
      fetch("http://localhost:5000/biodata").then((res) => res.json()),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:5000/biodata/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-biodatas"]);
      Swal.fire({
        title: "Deleted!",
        text: "Biodata has been removed.",
        icon: "success",
        customClass: { popup: "rounded-[30px]" },
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A1D1F",
      cancelButtonColor: "#f43f5e",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const updateMutation = useMutation({
    mutationFn: (updatedData) =>
      fetch(`http://localhost:5000/biodata/${editingProfile._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-biodatas"]);
      setEditingProfile(null);
      Swal.fire({
        title: "Updated!",
        text: "Profile information saved.",
        icon: "success",
        customClass: { popup: "rounded-[30px]" },
      });
    },
  });

  const onUpdateSubmit = (data) => updateMutation.mutate(data);

  const filteredData = biodatas.filter((b) =>
    b.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="p-20 text-center font-black animate-pulse text-rose-500 tracking-widest">
        SYNCING REGISTRY...
      </div>
    );

  return (
    <div className="p-4 md:p-10 text-left space-y-8 animate-in fade-in duration-700">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">
          Manage <span className="text-rose-500">Biodatas</span>
        </h2>
        <div className="relative w-full md:w-80 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-rose-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-3xl outline-none shadow-sm font-bold text-xs focus:ring-4 focus:ring-rose-500/5 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- Desktop Table View (Hidden on Mobile) --- */}
      <div className="hidden lg:block bg-white rounded-[40px] border border-stone-100 overflow-hidden shadow-sm">
        <table className="table w-full">
          <thead className="bg-stone-50 text-[10px] uppercase font-black tracking-widest text-stone-400 border-none">
            <tr>
              <th className="py-8 pl-10 text-left">Profile</th>
              <th className="text-left">Details</th>
              <th className="text-left">Address</th>
              <th className="pr-10 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-stone-50/50 transition-colors"
              >
                <td className="py-6 pl-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      className="w-12 h-12 rounded-2xl object-cover shadow-sm"
                      alt=""
                    />
                    <div>
                      <p className="font-black text-stone-800 text-sm uppercase italic">
                        {item.name}
                      </p>
                      <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">
                        Ref: {item._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-stone-600 uppercase italic">
                      {item.type}
                    </p>
                    <p className="text-[10px] font-bold text-stone-400 uppercase">
                      {item.age} Years Old
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1.5 text-stone-400 text-[11px] font-bold italic">
                    <MapPin size={12} className="text-rose-300" />{" "}
                    {item.address}
                  </div>
                </td>
                <td className="pr-10 text-right space-x-2">
                  <button
                    onClick={() => {
                      setEditingProfile(item);
                      reset(item);
                    }}
                    className="p-3 bg-stone-50 text-stone-400 rounded-xl hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-3 bg-rose-50 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card View (Hidden on Desktop) --- */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white p-6 rounded-[35px] border border-stone-100 shadow-sm space-y-6 relative overflow-hidden group"
          >
            {/* Status Badge */}
            <div className="absolute top-0 right-0 bg-stone-50 px-4 py-2 rounded-bl-3xl text-[9px] font-black uppercase text-stone-300 group-hover:bg-rose-50 group-hover:text-rose-400 transition-colors">
              {item.type}
            </div>

            <div className="flex items-center gap-4">
              <img
                src={item.image}
                className="w-16 h-16 rounded-[22px] object-cover shadow-md"
                alt=""
              />
              <div className="text-left">
                <h3 className="font-black text-stone-800 uppercase italic text-lg">
                  {item.name}
                </h3>
                <p className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                  ID: {item._id.slice(-6)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2 text-stone-400">
                <Calendar size={14} className="text-rose-300" />
                <span className="text-xs font-bold italic">
                  {item.age} Years
                </span>
              </div>
              <div className="flex items-center gap-2 text-stone-400">
                <MapPin size={14} className="text-rose-300" />
                <span className="text-xs font-bold italic truncate">
                  {item.address?.split(",")[0]}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  setEditingProfile(item);
                  reset(item);
                }}
                className="flex-1 py-4 bg-stone-50 text-stone-600 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Edit3 size={14} /> Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="flex-1 py-4 bg-rose-50 text-rose-500 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="py-20 text-center bg-stone-50 rounded-[40px] border-2 border-dashed border-stone-200">
          <Info size={40} className="mx-auto text-stone-200 mb-3" />
          <p className="text-stone-400 font-black italic uppercase tracking-widest text-sm">
            No matching biodatas found
          </p>
        </div>
      )}

      {/* --- Edit Modal (Unchanged) --- */}
      {editingProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-2xl rounded-[40px] p-8 md:p-12 relative max-h-[90vh] overflow-y-auto animate-in zoom-in duration-300 shadow-2xl">
            <button
              onClick={() => setEditingProfile(null)}
              className="absolute top-8 right-8 text-stone-300 hover:text-stone-900 transition-colors"
            >
              <X size={28} />
            </button>
            <h3 className="text-2xl font-black italic uppercase mb-10 text-left">
              Edit <span className="text-rose-500">Biodata</span>
            </h3>

            <form
              onSubmit={handleSubmit(onUpdateSubmit)}
              className="space-y-6 text-left"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">
                    Full Name
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-6 py-4 bg-stone-50 rounded-2xl font-bold text-sm outline-none border-none focus:ring-4 focus:ring-rose-500/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">
                    Age
                  </label>
                  <input
                    {...register("age")}
                    type="number"
                    className="w-full px-6 py-4 bg-stone-50 rounded-2xl font-bold text-sm outline-none border-none focus:ring-4 focus:ring-rose-500/5 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">
                  Image URL
                </label>
                <input
                  {...register("image")}
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl font-bold text-sm outline-none border-none focus:ring-4 focus:ring-rose-500/5 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-stone-400 ml-2 tracking-widest">
                  Expectations
                </label>
                <textarea
                  {...register("expectations")}
                  className="w-full px-6 py-4 bg-stone-50 rounded-2xl font-bold text-sm outline-none border-none h-32 resize-none focus:ring-4 focus:ring-rose-500/5 transition-all"
                />
              </div>
              <button className="w-full py-6 bg-stone-900 text-white rounded-[25px] font-black uppercase tracking-[0.3em] hover:bg-rose-600 transition-all shadow-xl active:scale-95 mt-4">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBiodatas;
