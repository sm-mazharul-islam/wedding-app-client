import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import one from "../../../Images/1.png";
import two from "../../../Images/2.png";
import three from "../../../Images/3.png";
import four from "../../../Images/4.png";
import {
  LayoutGrid,
  Users,
  Store,
  BarChart3,
  Menu,
  X,
  Package,
  LogOut,
  TrendingUp,
  Zap,
  Target,
  Activity,
  PlusCircle,
  MessageSquare,
  UserPlus,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import { AuthContext } from "../../../contexts/AuthProvider";
import CaroselLogo from "../DesignCom/CaroselLogo/CaroselLogo";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  const {
    data: stats = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["dashboard-intelligence", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/dashboard-stats/${user?.email}`,
      );
      if (!res.ok) throw new Error("Network Error");
      return res.json();
    },
    refetchInterval: 10000,
    enabled: !!user?.email,
  });

  useEffect(() => {
    const handleSync = () => refetch();
    window.addEventListener("roleUpdated", handleSync);
    return () => window.removeEventListener("roleUpdated", handleSync);
  }, [refetch]);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center font-black animate-pulse">
        Syncing...
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans text-[#1A1D1F] overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-500 lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} p-8`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-[#1A1D1F] rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="text-white" size={20} />
              <CaroselLogo />
            </div>
            <h1 className="font-black text-xl tracking-tighter">
              Wedding Planer
            </h1>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto">
            <NavItem
              to="/dashboard"
              icon={<LayoutGrid size={20} />}
              label="Overview"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="/"
              icon={<Store size={20} />}
              label="Global Shop"
              onClick={() => setIsSidebarOpen(false)}
            />
            {stats.role === "admin" ? (
              <>
                <NavItem
                  to="all-packages"
                  icon={<Package size={20} />}
                  label="Inventory"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="all-booking"
                  icon={<ClipboardList size={20} />}
                  label="All Booking"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="manage-user"
                  icon={<Users size={20} />}
                  label="User Access"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="add-products"
                  icon={<PlusCircle size={20} />}
                  label="New Listing"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="add-package"
                  icon={<PlusCircle size={20} />}
                  label="New Package"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="manage-shop"
                  icon={<PlusCircle size={20} />}
                  label="Manage Shop"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="manage-review"
                  icon={<MessageSquare size={20} />}
                  label="Manage Reviews"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="premium-control"
                  icon={<BarChart3 size={20} />}
                  label="Premium Control"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="create-biodatas"
                  icon={<UserPlus size={20} />}
                  label="Create Biodata"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="manage-biodatas"
                  icon={<Users size={20} />}
                  label="Manage Biodatas"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </>
            ) : (
              <>
                <NavItem
                  to="add-cart"
                  icon={<Package size={20} />}
                  label="My Orders"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="my-booking"
                  icon={<CalendarCheck size={20} />}
                  label="My Bookings"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="add-reviews"
                  icon={<Users size={20} />}
                  label="Feedback"
                  onClick={() => setIsSidebarOpen(false)}
                />
                <NavItem
                  to="unlock-biodata"
                  icon={<Users size={20} />}
                  label="Unlocked Biodata"
                  onClick={() => setIsSidebarOpen(false)}
                />
              </>
            )}
          </nav>
          <button
            onClick={logOut}
            className="mt-auto flex items-center gap-3 p-4 bg-red-50 text-red-600 rounded-2xl font-bold hover:bg-red-100 transition-all"
          >
            <LogOut size={20} /> <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-4 md:p-10">
        <header className="flex items-center justify-between mb-10">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <Menu />
          </button>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-gray-100 shadow-sm ml-auto">
            <img
              src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
              className="w-10 h-10 rounded-xl object-cover"
              alt=""
            />
            <div className="leading-tight">
              <p className="font-black text-sm">
                {user?.displayName?.split(" ")[0]}
              </p>
              <p className="text-[10px] text-primary font-bold uppercase">
                {stats.role || "user"}
              </p>
            </div>
          </div>
        </header>

        {isDashboardRoot ? (
          <div className="animate-in slide-in-from-bottom-5 duration-700">
            <h1 className="text-4xl font-black mb-2 text-[#1A1D1F] font-serif">
              {stats.title || "Dashboard"}
            </h1>
            <p className="text-gray-400 mb-10 font-medium">
              Predictive Intelligence & Activity Monitoring.
            </p>

            {/* METRIC CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {stats.metrics?.map((m, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4`}
                  >
                    <TrendingUp className="text-primary" size={22} />
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    {m.label}
                  </p>
                  <div className="flex items-end justify-between">
                    <h2 className="text-3xl font-black mt-1">{m.value}</h2>
                    <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-gray-50">
                      {m.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* CHART & PROBABILITY */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border shadow-sm">
                <h3 className="font-black text-xl mb-10">
                  Distribution Metrics
                </h3>
                <div className="flex items-end gap-12 h-64 border-b pb-2">
                  <Bar
                    label="Orders"
                    value={stats?.chartData?.orders || 0}
                    color="bg-black"
                  />
                  <Bar
                    label="Reviews"
                    value={stats?.chartData?.reviews || 0}
                    color="bg-yellow-400"
                  />
                  <Bar
                    label="Engagement"
                    value={stats?.chartData?.carts || 0}
                    color="bg-primary"
                  />
                </div>
              </div>
              <div className="bg-[#1A1D1F] p-10 rounded-[40px] text-white relative overflow-hidden">
                <Target
                  className="absolute -right-10 -bottom-10 opacity-10"
                  size={250}
                />
                <h3 className="text-xl font-bold mb-2">Success Probability</h3>
                <div className="text-7xl font-black mb-4 tracking-tighter">
                  {stats?.probability || "0%"}
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: stats?.probability || "0%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[40px] p-8 shadow-sm border border-gray-100 min-h-full">
            <Outlet />
          </div>
        )}
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    end
    className={({ isActive }) =>
      `flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all ${isActive ? "bg-[#1A1D1F] text-white shadow-2xl scale-105" : "text-gray-400 hover:bg-gray-50 hover:text-black"}`
    }
  >
    {icon} <span>{label}</span>
  </NavLink>
);

const Bar = ({ label, value, color }) => (
  <div className="flex-1 flex flex-col items-center gap-4 h-full justify-end group">
    <div
      className={`w-20 ${color} rounded-2xl transition-all duration-1000`}
      style={{
        height: `${Math.min((value / 15) * 100, 100)}%`,
        minHeight: value > 0 ? "20px" : "6px",
      }}
    />
    <span className="text-[10px] font-black text-gray-400 uppercase">
      {label}
    </span>
  </div>
);

export default Dashboard;
