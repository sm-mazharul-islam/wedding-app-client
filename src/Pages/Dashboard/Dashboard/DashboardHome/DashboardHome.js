//!!!!!!!!!
// DashboardHome.js
import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Package, Star, ShoppingCart, TrendingUp, Loader2 } from "lucide-react";
import { AuthContext } from "../../../../contexts/AuthProvider";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);

  const {
    data: stats = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-stats", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://wedding-app-server-eight.vercel.app/dashboard-stats/${user?.email}`,
      );
      return res.json();
    },
    refetchInterval: 15000, // নিয়মিত ১৫ সেকেন্ড পর পর ব্যাকগ্রাউন্ডে চেক করবে
    enabled: !!user?.email,
  });

  // ২ সেকেন্ডের মধ্যে লেআউট পরিবর্তন করার লিসেনার
  useEffect(() => {
    const handleSync = () => {
      console.log("Role update signal received. Syncing layout...");
      refetch(); // এটি কল হওয়া মাত্র লেআউট বদলে যাবে
    };
    window.addEventListener("roleUpdated", handleSync);
    return () => window.removeEventListener("roleUpdated", handleSync);
  }, [refetch]);

  if (isLoading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="space-y-8 p-10 animate-in fade-in duration-700">
      <header>
        <h1 className="text-3xl font-black text-[#1A1D1F]">{stats.title}</h1>
        <p className="text-gray-500">
          Instant overview of {stats.labelPrefix?.toLowerCase()} metrics.
        </p>
      </header>

      {/* STATS CARDS: ডাইনামিকালি "All" অথবা "My" লেবেল দেখাবে */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label={`${stats.labelPrefix} Packages`}
          value={stats.packages}
          icon={<Package className="text-blue-600" />}
          bg="bg-blue-50"
        />
        <StatCard
          label={`${stats.labelPrefix} Reviews`}
          value={stats.reviews}
          icon={<Star className="text-yellow-500" />}
          bg="bg-yellow-50"
        />
        <StatCard
          label={stats.labelPrefix === "All" ? "Total Cart" : "My Cart"}
          value={stats.cart}
          icon={<ShoppingCart className="text-green-500" />}
          bg="bg-green-50"
        />
        <StatCard
          label="Growth"
          value={stats.growth}
          icon={<TrendingUp className="text-purple-500" />}
          bg="bg-purple-50"
        />
      </div>

      <div className="bg-white p-8 rounded-[32px] border shadow-sm">
        <h3 className="font-bold mb-10 text-lg">Activity Distribution</h3>
        <div className="flex items-end gap-10 h-64 border-b pb-2">
          <Bar label="Orders" value={stats.packages} color="bg-[#1A1D1F]" />
          <Bar label="Reviews" value={stats.reviews} color="bg-[#FFD700]" />
          <Bar label="Cart" value={stats.cart} color="bg-[#10B981]" />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, bg }) => (
  <div className="bg-white p-6 rounded-2xl border flex items-center gap-4 hover:shadow-md transition-all">
    <div className={`p-4 rounded-xl ${bg}`}>{icon}</div>
    <div>
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-[#1A1D1F]">{value}</p>
    </div>
  </div>
);

const Bar = ({ label, value, color }) => (
  <div className="flex-1 flex flex-col items-center justify-end h-full gap-2">
    <div
      className={`w-12 ${color} rounded-t-lg transition-all duration-1000`}
      style={{ height: `${Math.min((value / 15) * 100, 100)}%` }}
    ></div>
    <span className="text-xs font-bold text-gray-400">{label}</span>
  </div>
);

export default DashboardHome;
