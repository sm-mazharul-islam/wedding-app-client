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
        title: "Revoked!",
        text: "Access closed.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const filteredData = allRequests.filter(
    (item) =>
      item.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.biodataName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading)
    return (
      <div className="p-20 text-center font-black animate-bounce text-rose-500">
        SYNCING ADMIN INTELLIGENCE...
      </div>
    );

  return (
    <div className="p-2 md:p-6 space-y-8 animate-in fade-in duration-700">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="text-left">
          <h2 className="text-4xl font-black italic tracking-tighter text-stone-800 uppercase">
            Premium{" "}
            <span className="text-rose-500 underline decoration-stone-200 underline-offset-8">
              Access
            </span>
          </h2>
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] mt-3">
            Live Monitoring: {allRequests.length} Connections
          </p>
        </div>
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-rose-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search User or Biodata..."
            className="w-full md:w-80 pl-12 pr-6 py-4 bg-white border border-stone-100 rounded-3xl shadow-sm focus:ring-4 focus:ring-rose-500/5 focus:border-rose-200 outline-none font-bold text-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Responsive Layout: Table for Large, Cards for Small */}
      <div className="hidden lg:block overflow-hidden bg-white rounded-[40px] border border-stone-100 shadow-xl shadow-stone-200/40">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-stone-50/50 border-b border-stone-100 text-[10px] uppercase font-black tracking-widest text-stone-400">
              <th className="py-8 pl-10 text-left">User Identifier</th>
              <th className="text-left">Target Profile</th>
              <th className="text-left">Unlock Timeline</th>
              <th className="pr-10 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item._id}
                className="group hover:bg-stone-50/50 transition-colors border-b border-stone-50 last:border-none"
              >
                <td className="py-6 pl-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-stone-100 rounded-2xl group-hover:bg-rose-50 transition-colors">
                      <Mail
                        size={16}
                        className="text-stone-400 group-hover:text-rose-500"
                      />
                    </div>
                    <span className="font-black text-stone-600 text-sm">
                      {item.userEmail}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <img
                      src={item.biodataImage}
                      className="w-12 h-12 rounded-2xl object-cover ring-4 ring-stone-50"
                      alt=""
                    />
                    <div className="text-left">
                      <p className="font-black text-stone-800 text-sm uppercase italic">
                        {item.biodataName}
                      </p>
                      <p className="text-[9px] font-bold text-stone-400">
                        ID: {item.biodataId?.slice(-6)}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-left">
                  <div className="flex flex-col">
                    <span className="font-black text-stone-700 text-xs">
                      {new Date(item.unlockDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[9px] font-bold text-stone-300 uppercase">
                      {new Date(item.unlockDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </td>
                <td className="pr-10 text-right">
                  <button
                    onClick={() => mutation.mutate(item._id)}
                    className="p-4 bg-stone-900 text-white rounded-2xl hover:bg-rose-600 hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-90"
                  >
                    <ShieldX size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Small Device Card View */}
      <div className="lg:hidden grid grid-cols-1 gap-6">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white p-8 rounded-[35px] border border-stone-100 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-6">
              <img
                src={item.biodataImage}
                className="w-14 h-14 rounded-2xl object-cover"
                alt=""
              />
              <div className="text-left">
                <h3 className="font-black text-stone-800 uppercase italic">
                  {item.biodataName}
                </h3>
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                  {item.userEmail}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-stone-50">
              <div className="text-left">
                <p className="text-[8px] font-black text-stone-300 uppercase">
                  Access Date
                </p>
                <p className="text-xs font-bold text-stone-600">
                  {new Date(item.unlockDate).toDateString()}
                </p>
              </div>
              <button
                onClick={() => mutation.mutate(item._id)}
                className="p-4 bg-rose-50 text-rose-500 rounded-2xl active:scale-90 transition-transform"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPremiumControl;
