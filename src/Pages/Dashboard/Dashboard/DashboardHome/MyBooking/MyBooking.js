import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import {
  Calendar,
  Phone,
  Users,
  PackageCheck,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import BASE_URL from "../../../../../config";

const MyBooking = () => {
  const { user } = useContext(AuthContext);

  const { data: myBookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/my-bookings/${user?.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading)
    return (
      <div className="p-20 text-center animate-pulse font-black text-rose-500 uppercase tracking-widest">
        Loading Schedule...
      </div>
    );

  return (
    <div className="p-4 md:p-10 text-left bg-white min-h-screen">
      <div className="mb-12">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-stone-800">
          My{" "}
          <span className="text-rose-500 underline decoration-stone-100 underline-offset-8">
            Bookings
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {myBookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-stone-100 rounded-[40px] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
          >
            {/* Package Image */}
            <div className="w-full md:w-44 h-44 rounded-[35px] overflow-hidden shadow-lg shrink-0">
              <img
                src={booking.packageImage}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-black text-stone-800 uppercase italic tracking-tighter leading-none">
                  {booking.packageName}
                </h3>
                <p className="text-2xl font-black text-rose-500 tracking-tighter">
                  ${booking.price}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-2 text-stone-400 text-[11px] font-bold italic uppercase">
                  <Calendar size={14} /> {booking.eventDate}
                </div>
                <div className="flex items-center gap-2 text-stone-400 text-[11px] font-bold italic uppercase">
                  <Users size={14} /> {booking.guestCount} Guests
                </div>
              </div>

              {/* Status Logic Section */}
              <div className="pt-2">
                {booking.status === "Approved" ? (
                  <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-5 py-3 rounded-2xl">
                    <CheckCircle2 size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Order Confirmed
                    </span>
                  </div>
                ) : booking.status === "Rejected" ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-500 bg-rose-50 px-5 py-3 rounded-2xl">
                      <AlertCircle size={18} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Request Rejected
                      </span>
                    </div>
                    <p className="text-[10px] font-bold text-rose-400 italic ml-2">
                      * Sorry, slots are full right now. Please try another
                      date.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-500 bg-amber-50 px-5 py-3 rounded-2xl">
                    <PackageCheck size={18} className="animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Awaiting Admin Approval
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooking;
