import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Phone,
  Filter,
  Trash2,
  Mail, // মেইল আইকনটি যোগ করা হয়েছে
} from "lucide-react";

const AllBooking = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("All");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: () =>
      fetch("http://localhost:5000/admin/all-bookings").then((res) =>
        res.json(),
      ),
  });

  const sortedBookings = [...bookings].sort(
    (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate),
  );

  const filteredBookings =
    statusFilter === "All"
      ? sortedBookings
      : sortedBookings.filter((item) => item.status === statusFilter);

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      fetch(`http://localhost:5000/bookings/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-bookings"]);
      Swal.fire({
        title: "Removed!",
        text: "Booking history cleared.",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: true,
      });
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) =>
      fetch(`http://localhost:5000/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["all-bookings"]);
      Swal.fire({
        title: "Updated!",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete History?",
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
    }).then((res) => {
      if (res.isConfirmed) deleteMutation.mutate(id);
    });
  };

  if (isLoading)
    return (
      <div className="p-20 text-center font-black animate-pulse text-rose-500 tracking-[0.5em]">
        SYNCING REGISTRY...
      </div>
    );

  return (
    <div className="p-4 md:p-10 text-left bg-stone-50 min-h-screen">
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-stone-800">
            Booking <span className="text-rose-500">Logistics</span>
          </h2>
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-3">
            Registry Master Control
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white p-2.5 rounded-2xl shadow-sm border border-stone-100 w-full md:w-auto">
          <Filter size={18} className="text-stone-300 ml-2" />
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent outline-none font-black uppercase text-[10px] tracking-widest text-stone-600 flex-1 md:w-40 cursor-pointer"
          >
            <option value="All">All Requests</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* --- Desktop View: Table --- */}
      <div className="hidden lg:block bg-white rounded-[45px] border border-stone-100 overflow-hidden shadow-sm">
        <table className="table w-full border-collapse">
          <thead className="bg-[#1A1D1F] text-white">
            <tr>
              <th className="py-8 pl-10 uppercase tracking-widest text-[9px] font-black">
                Client & Package
              </th>
              <th className="uppercase tracking-widest text-[9px] font-black">
                Event Data
              </th>
              <th className="uppercase tracking-widest text-[9px] font-black">
                Status
              </th>
              <th className="pr-10 text-right uppercase tracking-widest text-[9px] font-black">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredBookings.map((item, index) => (
              <tr
                key={item._id}
                className={`group hover:bg-stone-50/50 transition-all ${index < 2 && statusFilter === "All" ? "bg-rose-50/20 border-l-4 border-rose-500" : ""}`}
              >
                <td className="py-6 pl-10">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.packageImage}
                      className="w-14 h-14 rounded-2xl object-cover shadow-sm"
                      alt=""
                    />
                    <div className="space-y-0.5">
                      <p className="font-black text-stone-800 text-sm uppercase italic">
                        {item.packageName}
                      </p>
                      <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1">
                        <User size={10} className="text-rose-400" />{" "}
                        {item.userName}
                      </p>
                      {/* ইউজার ইমেইল (Desktop) */}
                      <p className="text-[9px] font-bold text-stone-300 flex items-center gap-1 lowercase">
                        <Mail size={10} className="text-stone-300" />{" "}
                        {item.userEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1">
                    <p className="text-xs font-black text-stone-600 italic flex items-center gap-2">
                      <Calendar size={14} className="text-rose-400" />{" "}
                      {item.eventDate}
                    </p>
                    <p className="text-[10px] font-bold text-stone-400 flex items-center gap-2 tracking-tighter">
                      <Phone size={12} className="text-rose-400" /> {item.phone}
                    </p>
                  </div>
                </td>
                <td>
                  <span
                    className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === "Approved" ? "bg-emerald-50 text-emerald-500" : item.status === "Rejected" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="pr-10 text-right space-x-2">
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            id: item._id,
                            status: "Approved",
                          })
                        }
                        className="p-3 bg-emerald-50 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button
                        onClick={() =>
                          statusMutation.mutate({
                            id: item._id,
                            status: "Rejected",
                          })
                        }
                        className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                      >
                        <XCircle size={18} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-3 bg-stone-50 text-stone-300 rounded-xl hover:bg-stone-900 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile View: Single Card --- */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {filteredBookings.map((item, index) => (
          <div
            key={item._id}
            className={`bg-white p-6 rounded-[35px] border border-stone-100 shadow-sm space-y-5 relative overflow-hidden ${index < 2 && statusFilter === "All" ? "ring-2 ring-rose-500/20" : ""}`}
          >
            {index < 2 && statusFilter === "All" && (
              <div className="absolute top-0 right-0 bg-rose-500 text-white px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest animate-pulse">
                New Request
              </div>
            )}

            <div className="flex items-start gap-4">
              <img
                src={item.packageImage}
                className="w-16 h-16 rounded-[20px] object-cover"
                alt=""
              />
              <div className="space-y-1">
                <h3 className="font-black text-stone-800 uppercase italic leading-none">
                  {item.packageName}
                </h3>
                <p className="text-[9px] font-bold text-stone-400 uppercase flex items-center gap-1">
                  <User size={10} className="text-rose-400" /> {item.userName}
                </p>
                {/* ইউজার ইমেইল (Mobile) */}
                <p className="text-[9px] font-bold text-stone-300 flex items-center gap-1 lowercase">
                  <Mail size={10} /> {item.userEmail}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-50">
              <div className="text-[10px] font-bold text-stone-400 uppercase italic flex items-center gap-1">
                <Calendar size={12} className="text-rose-400" />{" "}
                {item.eventDate}
              </div>
              <div className="text-[10px] font-bold text-stone-400 uppercase italic flex items-center justify-end gap-1">
                <Phone size={12} className="text-rose-400" /> {item.phone}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span
                className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${item.status === "Approved" ? "bg-emerald-50 text-emerald-500" : item.status === "Rejected" ? "bg-rose-50 text-rose-500" : "bg-amber-50 text-amber-500"}`}
              >
                {item.status}
              </span>
              <div className="flex gap-2">
                {item.status === "Pending" && (
                  <button
                    onClick={() =>
                      statusMutation.mutate({
                        id: item._id,
                        status: "Approved",
                      })
                    }
                    className="p-3 bg-emerald-50 text-emerald-500 rounded-xl shadow-sm"
                  >
                    <CheckCircle size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-3 bg-stone-50 text-stone-300 rounded-xl shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-stone-100 mt-6 font-black uppercase italic text-stone-300 tracking-widest">
          No Records Found
        </div>
      )}
    </div>
  );
};

export default AllBooking;
