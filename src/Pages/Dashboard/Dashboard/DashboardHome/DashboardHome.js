import React, { useState, useEffect, useContext } from "react"; // Added useContext
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Package, Star, ShoppingCart, TrendingUp } from "lucide-react";
import { AuthContext } from "../../../../contexts/AuthProvider";

const DashboardHome = () => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useContext(AuthContext); // Get the specific logged-in user

  // 1. Fetch REAL Packages count
  const { data: packages = [] } = useQuery({
    queryKey: ["servicesPackage"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/servicesPackage");
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
  });

  // 2. Fetch REAL Reviews count
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch("http://localhost:5000/reviews").then((res) => res.json()),
  });

  // 3. Sync with the SPECIFIC user's LocalStorage cart
  useEffect(() => {
    const loadCartCount = () => {
      // Logic: Only load if user is logged in, using their unique ID
      if (user?.uid) {
        const userCartKey = `cart_${user.uid}`;
        const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
        setCartCount(data.length);
      } else {
        setCartCount(0);
      }
    };

    loadCartCount();
    window.addEventListener("storage", loadCartCount);
    window.addEventListener("cartUpdated", loadCartCount);

    return () => {
      window.removeEventListener("storage", loadCartCount);
      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, [user]); // Re-run when user logs in/out

  // Data for the Bar Chart
  const chartData = [
    { name: "Packages", count: packages.length, fill: "#1A1D1F" },
    { name: "Reviews", count: reviews.length, fill: "#FFD700" },
    { name: "Cart", count: cartCount, fill: "#00D1FF" },
  ];

  const stats = [
    {
      label: "Total Packages",
      value: packages.length,
      icon: <Package className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Client Reviews",
      value: reviews.length,
      icon: <Star className="text-yellow-500" />,
      bg: "bg-yellow-50",
    },
    {
      label: "Cart Items",
      value: cartCount, // Shows exact number for current user
      icon: <ShoppingCart className="text-green-500" />,
      bg: "bg-green-50",
    },
    {
      label: "Growth",
      value: "+12%",
      icon: <TrendingUp className="text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* STATS CARDS - EXACT DESIGN */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow bg-white"
          >
            <div className={`p-4 rounded-2xl ${stat.bg}`}>{stat.icon}</div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* BAR CHART: Package vs Reviews vs Cart */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-xl font-bold mb-6">Activity Distribution</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#F4F4F4"
              />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                cursor={{ fill: "#F9FAFB" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="count" radius={[10, 10, 0, 0]} barSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AREA CHART: Engagement Trend */}
        <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm h-[400px]">
          <h3 className="text-xl font-bold mb-6">Engagement Trend</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1A1D1F" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#1A1D1F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#1A1D1F"
                fillOpacity={1}
                fill="url(#colorCount)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
