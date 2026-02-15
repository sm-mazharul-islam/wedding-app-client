import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Trash2,
  Mail,
  Search,
  ShieldX,
  Calendar,
  User,
  LayoutGrid,
  List,
  Activity,
  UserCheck,
  Zap,
} from "lucide-react";

const AdminPremiumControl = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: allRequests = [], isLoading } = useQuery({
    queryKey: ["all-premium-requests"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/all-unlocked-requests");
      return res.json();
    },
    refetchInterval: 5000,
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`http://localhost:5000/unlock-premium/${id}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-premium-requests"]);
      Swal.fire({
        icon: "success",
        title: "Access Revoked",
        text: "The user's premium connection has been closed.",
        showConfirmButton: false,
        timer: 1500,
        customClass: { popup: "rounded-[30px]" },
      });
    },
  });

  const filteredData = allRequests.filter(
    (item) =>
      item.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.biodataName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <div className="w-12 h-12 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin"></div>
        <p className="font-black text-rose-500 uppercase text-xs tracking-widest animate-pulse">
          Syncing Admin Intelligence...
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 text-left">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatSummary
          icon={<UserCheck className="text-emerald-500" />}
          label="Total Connections"
          value={allRequests.length}
          subLabel="Active access records"
        />
        <StatSummary
          icon={<Zap className="text-amber-500" />}
          label="Live Sync"
          value="Enabled"
          subLabel="Real-time monitoring"
        />
        <StatSummary
          icon={<Activity className="text-rose-500" />}
          label="Filtered"
          value={filteredData.length}
          subLabel="Current search results"
        />
      </div>

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm">
        <div className="space-y-2">
          <h2 className="text-4xl font-black italic tracking-tighter text-stone-800 uppercase flex items-center gap-3">
            Premium{" "}
            <span className="text-rose-500 underline decoration-stone-200 underline-offset-8">
              Power
            </span>
          </h2>
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Centralized Access Management
          </p>
        </div>

        <div className="relative group w-full md:w-96">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-rose-500 transition-all duration-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search User or Biodata..."
            className="w-full pl-14 pr-6 py-5 bg-stone-50 border-none rounded-[25px] focus:ring-4 focus:ring-rose-500/10 outline-none font-bold text-sm transition-all placeholder:text-stone-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Large Screen Table View */}
      <div className="hidden lg:block overflow-hidden bg-white rounded-[45px] border border-stone-100 shadow-2xl shadow-stone-200/30">
        <table className="table w-full">
          <thead>
            <tr className="bg-stone-50/50 text-[11px] uppercase font-black tracking-widest text-stone-400 border-none">
              <th className="py-8 pl-10 text-left">User Identifier</th>
              <th className="text-left">Target Profile</th>
              <th className="text-left">Access Granted</th>
              <th className="pr-10 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="group hover:bg-stone-50/40 transition-all duration-300"
              >
                <td className="py-6 pl-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center group-hover:bg-rose-50 group-hover:rotate-6 transition-all duration-500">
                      <Mail
                        size={18}
                        className="text-stone-400 group-hover:text-rose-500"
                      />
                    </div>
                    <span className="font-black text-stone-600 text-sm tracking-tight italic">
                      {item.userEmail}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={item.biodataImage}
                        className="w-14 h-14 rounded-2xl object-cover ring-4 ring-stone-50 group-hover:ring-rose-50 transition-all shadow-md"
                        alt=""
                      />
                      <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-lg shadow-sm">
                        <User size={10} className="text-rose-500" />
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-black text-stone-800 text-sm uppercase italic">
                        {item.biodataName}
                      </p>
                      <p className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">
                        Ref: {item.biodataId?.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-left">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} className="text-rose-300" />
                    <div className="flex flex-col">
                      <span className="font-black text-stone-700 text-xs">
                        {new Date(item.unlockDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      <span className="text-[10px] font-bold text-stone-300 uppercase tracking-tighter">
                        at{" "}
                        {new Date(item.unlockDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="pr-10 text-right">
                  <button
                    onClick={() => mutation.mutate(item._id)}
                    className="p-4 bg-stone-900 text-white rounded-2xl hover:bg-rose-600 hover:rotate-12 transition-all active:scale-90 shadow-xl shadow-stone-200 group-hover:shadow-rose-100"
                  >
                    <ShieldX size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small Device Card View */}
      <div className="lg:hidden grid grid-cols-1 gap-6 pb-20">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white p-8 rounded-[45px] border border-stone-100 shadow-sm relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/30 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-rose-100 transition-all"></div>

            <div className="flex items-center gap-5 mb-8 relative">
              <img
                src={item.biodataImage}
                className="w-16 h-16 rounded-[24px] object-cover shadow-lg"
                alt=""
              />
              <div className="text-left">
                <h3 className="font-black text-stone-800 uppercase italic text-lg tracking-tighter">
                  {item.biodataName}
                </h3>
                <div className="flex items-center gap-2 text-stone-400">
                  <Mail size={12} />
                  <p className="text-[10px] font-bold uppercase truncate w-32 tracking-widest">
                    {item.userEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-6 border-t border-stone-50">
              <div className="text-left space-y-1">
                <p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.2em]">
                  Access Timeline
                </p>
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar size={14} className="text-rose-400" />
                  <p className="text-xs font-black">
                    {new Date(item.unlockDate).toDateString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => mutation.mutate(item._id)}
                className="w-14 h-14 bg-rose-50 text-rose-500 rounded-[22px] flex items-center justify-center active:scale-90 transition-all shadow-sm"
              >
                <Trash2 size={22} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="py-20 text-center space-y-4 bg-stone-50 rounded-[50px] border-4 border-dashed border-stone-100">
          <LayoutGrid size={48} className="mx-auto text-stone-200" />
          <p className="text-stone-400 font-black italic uppercase tracking-widest text-sm">
            No connections found in current matrix
          </p>
        </div>
      )}
    </div>
  );
};

// Sub-component for Stats
const StatSummary = ({ icon, label, value, subLabel }) => (
  <div className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
    <div className="flex items-center justify-between mb-4">
      <div className="p-4 bg-stone-50 rounded-2xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">
        {subLabel}
      </span>
    </div>
    <div className="text-left">
      <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">
        {label}
      </p>
      <h2 className="text-3xl font-black text-stone-800 tracking-tighter italic">
        {value}
      </h2>
    </div>
  </div>
);

export default AdminPremiumControl;
