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
} from "lucide-react";

const UnlockBiodata = () => {
  const currentUserEmail = localStorage.getItem("userEmail");

  const { data: unlockedList = [], isLoading } = useQuery({
    queryKey: ["my-unlocked-data", currentUserEmail],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/unlocked-requests/${currentUserEmail?.toLowerCase()}`,
      );
      return res.json();
    },
    refetchInterval: 3000,
    enabled: !!currentUserEmail,
  });

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse text-rose-500 font-black tracking-widest">
        LOADING SECURE DATA...
      </div>
    );

  return (
    <div className="p-2 md:p-6 text-left space-y-10 animate-in slide-in-from-bottom-5 duration-700">
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-stone-800 uppercase">
          My <span className="text-rose-500">Unlocked</span> Connections
        </h2>
        <div className="flex items-center gap-2 mt-4">
          <Heart size={14} className="text-rose-500 fill-rose-500" />
          <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Exclusive Access Records
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {unlockedList.length > 0 ? (
          unlockedList.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-[45px] p-8 border border-stone-100 shadow-sm hover:shadow-2xl hover:shadow-rose-500/5 transition-all duration-500 relative overflow-hidden"
            >
              {/* Badge */}
              <div className="absolute top-6 right-8 bg-rose-500/10 text-rose-500 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest">
                Premium
              </div>

              <div className="flex items-start gap-5 mb-8">
                <div className="relative">
                  <img
                    src={item.biodataImage}
                    className="w-20 h-20 rounded-[2rem] object-cover ring-8 ring-stone-50 group-hover:ring-rose-50 transition-all duration-500"
                    alt=""
                  />
                  <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-lg text-rose-500">
                    <Sparkles size={12} />
                  </div>
                </div>
                <div className="mt-2">
                  <h3 className="text-xl font-black text-stone-800 uppercase italic tracking-tighter leading-none mb-2">
                    {item.biodataName}
                  </h3>
                  <p className="flex items-center gap-1 text-stone-400 text-[10px] font-bold uppercase tracking-tight">
                    <MapPin size={12} className="text-rose-400" />{" "}
                    {item.biodataAddress}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-stone-50">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-stone-50 rounded-2xl text-stone-400 group-hover:text-rose-500 transition-colors">
                    <Calendar size={18} />
                  </div>
                  <div className="text-left">
                    <p className="text-[8px] font-black text-stone-300 uppercase tracking-widest">
                      Unlocked On
                    </p>
                    <p className="text-xs font-black text-stone-700 italic">
                      {new Date(item.unlockDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/findYourMatch/${item.biodataId}`}
                  className="bg-stone-900 text-white w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-rose-500 hover:scale-110 shadow-xl shadow-stone-200 transition-all active:scale-95"
                >
                  <ExternalLink size={20} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-32 bg-stone-50/50 rounded-[50px] border-4 border-dashed border-stone-100 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm mb-6 text-stone-200">
              <Lock size={32} />
            </div>
            <h4 className="text-xl font-black text-stone-400 italic uppercase">
              Your history is clear
            </h4>
            <p className="text-stone-300 text-[10px] font-bold uppercase mt-2 tracking-widest px-10 leading-loose">
              Unlock profiles to see them listed here for quick access.
            </p>
            <Link
              to="/findYourMatch"
              className="mt-8 bg-stone-900 text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-500 transition-all active:scale-95"
            >
              Browse Profiles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnlockBiodata;
