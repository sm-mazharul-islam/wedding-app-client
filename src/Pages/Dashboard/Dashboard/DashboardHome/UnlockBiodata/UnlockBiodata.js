import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  Calendar,
  MapPin,
  Lock,
  Sparkles,
  Heart,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import BASE_URL from "../../../../../config";

const UnlockBiodata = () => {
  const currentUserEmail = localStorage.getItem("userEmail");

  // TanStack Query ব্যবহার করে অটো-রিফ্রেশ লজিক
  const { data: unlockedList = [], isLoading } = useQuery({
    queryKey: ["my-unlocked-data", currentUserEmail],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/unlocked-requests/${currentUserEmail?.toLowerCase()}`,
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    refetchInterval: 5000, // ৫ সেকেন্ড পরপর চেক করবে (রিয়েল-টাইম অ্যাডমিন অ্যাকশন ডিটেকশন)
    enabled: !!currentUserEmail,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-rose-100 border-t-rose-500 rounded-full animate-spin mb-4"></div>
        <p className="text-rose-500 font-black uppercase text-[10px] tracking-[0.3em]">
          Syncing History...
        </p>
      </div>
    );

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700 text-left">
      {/* Header Section */}
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-500 rounded-lg">
            <ShieldCheck className="text-white" size={18} />
          </div>
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.4em]">
            Verified Connections
          </p>
        </div>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-stone-800 uppercase">
          My{" "}
          <span className="text-rose-500 underline decoration-stone-100 underline-offset-[12px]">
            Unlocked
          </span>{" "}
          Biodatas
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {unlockedList.length > 0 ? (
          unlockedList.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[45px] p-8 border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-500 relative overflow-hidden"
            >
              {/* Top Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50/20 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-rose-100/40 transition-all"></div>

              {/* Profile Info */}
              <div className="flex items-start gap-6 mb-10 relative">
                <div className="relative">
                  <img
                    src={item.biodataImage}
                    className="w-24 h-24 rounded-[2.5rem] object-cover ring-8 ring-stone-50 group-hover:ring-rose-50 transition-all duration-500 shadow-lg"
                    alt={item.biodataName}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-2xl shadow-xl text-rose-500 border border-rose-50">
                    <Heart size={14} className="fill-rose-500" />
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  <h3 className="text-2xl font-black text-stone-800 uppercase italic tracking-tighter leading-none">
                    {item.biodataName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-stone-400">
                    <MapPin size={14} className="text-rose-400" />
                    <span className="text-xs font-bold uppercase tracking-tight">
                      {item.biodataAddress}
                    </span>
                  </div>
                  <div className="inline-block bg-stone-900 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    ID: {item.biodataId?.slice(-6)}
                  </div>
                </div>
              </div>

              {/* Bottom Info & Action */}
              <div className="flex items-center justify-between pt-8 border-t border-stone-50 relative">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:text-rose-500 group-hover:bg-rose-50 transition-all duration-500">
                    <Calendar size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest mb-0.5">
                      Unlocked Date
                    </p>
                    <p className="text-sm font-black text-stone-700 italic">
                      {item.unlockDate
                        ? new Date(item.unlockDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/findYourMatch/${item.biodataId}`}
                  className="bg-stone-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:scale-110 shadow-xl shadow-stone-200 transition-all active:scale-95 group/btn"
                >
                  <ArrowUpRight
                    size={24}
                    className="group-hover/btn:rotate-12 transition-transform"
                  />
                </Link>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="col-span-full py-32 bg-stone-50/50 rounded-[60px] border-4 border-dashed border-stone-100 flex flex-col items-center justify-center text-center px-10">
            <div className="w-24 h-24 bg-white rounded-[32px] flex items-center justify-center shadow-sm mb-8 text-stone-200">
              <Lock size={40} />
            </div>
            <h4 className="text-2xl font-black text-stone-400 italic uppercase tracking-tighter">
              No Active Connections
            </h4>
            <p className="text-stone-300 text-[11px] font-bold uppercase mt-4 tracking-[0.2em] max-w-sm leading-loose">
              Unlock premium biodatas to see them listed here. Once unlocked,
              you can access contact details anytime.
            </p>
            <Link
              to="/findYourMatch"
              className="mt-10 bg-stone-900 text-white px-12 py-5 rounded-[20px] font-black uppercase text-xs tracking-widest hover:bg-rose-500 transition-all active:scale-95 shadow-2xl shadow-stone-200"
            >
              Start Searching
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockBiodata;
