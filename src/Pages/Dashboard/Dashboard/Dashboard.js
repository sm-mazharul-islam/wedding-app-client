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

// import React, { useContext, useEffect, useState } from "react";
// import { NavLink, Outlet, useLocation } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import {
//   LayoutGrid,
//   Users,
//   Store,
//   BarChart3,
//   Menu,
//   X,
//   Package,
//   LogOut,
//   TrendingUp,
//   Zap,
//   Target,
//   Activity,
//   PlusCircle,
//   MessageSquare,
//   UserPlus,
//   CalendarCheck,
//   ClipboardList,
//   Sparkles,
//   Bell,
// } from "lucide-react";
// import { AuthContext } from "../../../contexts/AuthProvider";

// const Dashboard = () => {
//   const { user, logOut } = useContext(AuthContext);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const location = useLocation();
//   const isDashboardRoot = location.pathname === "/dashboard";

//   const {
//     data: stats = {},
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["dashboard-intelligence", user?.email],
//     queryFn: async () => {
//       const res = await fetch(
//         `http://localhost:5000/dashboard-stats/${user?.email}`,
//       );
//       if (!res.ok) throw new Error("Network Error");
//       return res.json();
//     },
//     refetchInterval: 10000,
//     enabled: !!user?.email,
//   });

//   useEffect(() => {
//     const handleSync = () => refetch();
//     window.addEventListener("roleUpdated", handleSync);
//     return () => window.removeEventListener("roleUpdated", handleSync);
//   }, [refetch]);

//   if (isLoading)
//     return (
//       <div className="h-screen flex flex-col items-center justify-center bg-white">
//         <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="font-black text-xs uppercase tracking-[0.5em] text-stone-400">
//           Syncing Intelligence
//         </p>
//       </div>
//     );

//   return (
//     <div className="flex h-screen bg-[#FDFCFB] font-sans text-[#1A1D1F] overflow-hidden relative">
//       {/* BACKGROUND DECORATION BLUBS */}
//       <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-rose-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
//       <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />

//       {/* MOBILE OVERLAY */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-stone-900/40 backdrop-blur-md z-40 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}

//       {/* SIDEBAR (Glassmorphism Style) */}
//       <aside
//         className={`fixed inset-y-0 left-0 z-50 w-80 bg-white/80 backdrop-blur-xl border-r border-stone-100 transform transition-transform duration-500 lg:translate-x-0 lg:static lg:block ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} p-8`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center gap-3 mb-12">
//             <div className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center shadow-2xl group hover:rotate-12 transition-transform duration-300">
//               <Zap className="text-rose-500" size={24} fill="currentColor" />
//             </div>
//             <div>
//               <h1 className="font-black text-xl tracking-tighter leading-none">
//                 WEDDING
//               </h1>
//               <p className="text-[10px] font-bold text-rose-500 tracking-[0.3em] uppercase">
//                 Intelligence
//               </p>
//             </div>
//           </div>

//           <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2 custom-scrollbar">
//             <NavItem
//               to="/dashboard"
//               icon={<LayoutGrid size={18} />}
//               label="Overview"
//               onClick={() => setIsSidebarOpen(false)}
//             />
//             <NavItem
//               to="/"
//               icon={<Store size={18} />}
//               label="Global Shop"
//               onClick={() => setIsSidebarOpen(false)}
//             />

//             <div className="py-6">
//               <p className="text-[9px] font-black text-stone-300 uppercase tracking-[0.3em] px-4 italic">
//                 Management
//               </p>
//             </div>

//             {stats.role === "admin" ? (
//               <>
//                 <NavItem
//                   to="all-packages"
//                   icon={<Package size={18} />}
//                   label="Inventory"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="all-booking"
//                   icon={<ClipboardList size={18} />}
//                   label="All Bookings"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="manage-user"
//                   icon={<Users size={18} />}
//                   label="User Access"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="add-package"
//                   icon={<PlusCircle size={18} />}
//                   label="New Package"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="manage-biodatas"
//                   icon={<UserPlus size={18} />}
//                   label="Biodata Registry"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//               </>
//             ) : (
//               <>
//                 <NavItem
//                   to="add-cart"
//                   icon={<Package size={18} />}
//                   label="My Orders"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="my-booking"
//                   icon={<CalendarCheck size={18} />}
//                   label="My Bookings"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//                 <NavItem
//                   to="add-reviews"
//                   icon={<MessageSquare size={18} />}
//                   label="Feedback"
//                   onClick={() => setIsSidebarOpen(false)}
//                 />
//               </>
//             )}
//           </nav>

//           <button
//             onClick={logOut}
//             className="mt-8 flex items-center gap-3 p-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-lg hover:shadow-rose-200"
//           >
//             <LogOut size={18} /> <span>Terminate Session</span>
//           </button>
//         </div>
//       </aside>

//       {/* MAIN CONTENT */}
//       <main className="flex-1 overflow-y-auto p-4 md:p-12 relative">
//         <header className="flex items-center justify-between mb-12">
//           <button
//             onClick={() => setIsSidebarOpen(true)}
//             className="lg:hidden p-3 bg-white rounded-xl shadow-md border border-stone-100"
//           >
//             <Menu size={20} />
//           </button>

//           <div className="flex items-center gap-6 ml-auto">
//             <button className="relative p-3 bg-white rounded-xl shadow-sm border border-stone-100 text-stone-400 hover:text-rose-500 transition-colors">
//               <Bell size={20} />
//               <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
//             </button>
//             <div className="flex items-center gap-4 bg-white p-1.5 pr-6 rounded-2xl border border-stone-100 shadow-sm">
//               <img
//                 src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
//                 className="w-10 h-10 rounded-xl object-cover ring-2 ring-stone-50"
//                 alt=""
//               />
//               <div className="leading-tight">
//                 <p className="font-black text-sm uppercase italic tracking-tighter">
//                   {user?.displayName?.split(" ")[0]}
//                 </p>
//                 <p className="text-[9px] text-rose-500 font-black uppercase tracking-widest">
//                   {stats.role || "member"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </header>

//         {isDashboardRoot ? (
//           <div className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
//             {/* WELCOME LUXURY CARD */}
//             <div className="bg-stone-900 rounded-[50px] p-10 md:p-16 mb-12 text-white relative overflow-hidden group shadow-2xl">
//               <Sparkles
//                 className="absolute right-10 top-10 text-rose-500 opacity-20 group-hover:rotate-45 transition-transform duration-1000"
//                 size={150}
//               />
//               <div className="relative z-10 max-w-2xl">
//                 <h1 className="text-5xl md:text-7xl font-black mb-6 font-serif italic tracking-tighter leading-none">
//                   Welcome back, <br />{" "}
//                   <span className="text-rose-500">{user?.displayName}!</span>
//                 </h1>
//                 <p className="text-stone-400 font-medium leading-relaxed text-lg">
//                   System operational. We are tracking{" "}
//                   <span className="text-white underline decoration-rose-500 underline-offset-8 decoration-4">
//                     {stats.metrics?.[0]?.value || 0} active flows
//                   </span>{" "}
//                   with premium efficiency.
//                 </p>
//               </div>
//             </div>

//             {/* METRIC CARDS */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//               {stats.metrics?.map((m, i) => (
//                 <div
//                   key={i}
//                   className="bg-white p-8 rounded-[40px] border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group relative overflow-hidden"
//                 >
//                   <div className="absolute -right-4 -top-4 w-20 h-20 bg-rose-500/5 rounded-full group-hover:scale-150 transition-transform duration-700" />
//                   <div className="flex justify-between items-start mb-6">
//                     <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-all duration-500">
//                       <TrendingUp size={22} />
//                     </div>
//                     <span className="text-[10px] font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 uppercase tracking-widest">
//                       {m.growth || "+24%"}
//                     </span>
//                   </div>
//                   <p className="text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
//                     {m.label}
//                   </p>
//                   <h2 className="text-4xl font-black tracking-tighter text-stone-800">
//                     {m.value}
//                   </h2>
//                 </div>
//               ))}
//             </div>

//             {/* CHARTS & ANALYTICS SECTION */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//               <div className="lg:col-span-2 bg-white p-12 rounded-[50px] border border-stone-100 shadow-sm relative overflow-hidden">
//                 <div className="flex justify-between items-center mb-16">
//                   <h3 className="font-black text-2xl italic uppercase tracking-tighter border-l-4 border-rose-500 pl-4">
//                     Flow Analysis
//                   </h3>
//                   <div className="p-2 bg-stone-50 rounded-xl">
//                     <Activity size={20} className="text-stone-300" />
//                   </div>
//                 </div>
//                 <div className="flex items-end gap-12 h-64 pb-4">
//                   <Bar
//                     label="Orders"
//                     value={stats?.chartData?.orders || 0}
//                     color="bg-stone-900"
//                   />
//                   <Bar
//                     label="Feedback"
//                     value={stats?.chartData?.reviews || 0}
//                     color="bg-rose-500"
//                   />
//                   <Bar
//                     label="Saved"
//                     value={stats?.chartData?.carts || 0}
//                     color="bg-blue-500"
//                   />
//                 </div>
//               </div>

//               {/* SUCCESS PROBABILITY CIRCLE/CARD */}
//               <div className="bg-stone-900 p-12 rounded-[50px] text-white flex flex-col justify-between relative overflow-hidden group shadow-2xl">
//                 <Target
//                   className="absolute -right-20 -bottom-20 opacity-5 group-hover:scale-110 transition-transform duration-1000"
//                   size={350}
//                 />
//                 <div>
//                   <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center mb-6">
//                     <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
//                   </div>
//                   <h3 className="text-sm font-black uppercase tracking-widest text-rose-500 mb-2">
//                     Success Index
//                   </h3>
//                   <p className="text-stone-500 text-xs">
//                     AI-driven predictive score
//                   </p>
//                 </div>
//                 <div>
//                   <div className="text-8xl font-black mb-6 tracking-tighter italic">
//                     {stats?.probability || "92%"}
//                   </div>
//                   <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-md">
//                     <div
//                       className="h-full bg-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.8)] transition-all duration-1000 ease-out"
//                       style={{ width: stats?.probability || "92%" }}
//                     ></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="bg-white rounded-[50px] p-6 md:p-12 shadow-2xl shadow-stone-200/40 border border-stone-50 min-h-full transition-all duration-500">
//             <Outlet />
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// const NavItem = ({ to, icon, label, onClick }) => (
//   <NavLink
//     to={to}
//     onClick={onClick}
//     end
//     className={({ isActive }) =>
//       `flex items-center gap-4 px-6 py-4 rounded-[22px] text-xs font-black uppercase tracking-widest transition-all duration-300 ${
//         isActive
//           ? "bg-stone-900 text-white shadow-2xl shadow-stone-900/40 translate-x-3 scale-105"
//           : "text-stone-400 hover:bg-stone-50 hover:text-stone-900 hover:translate-x-2"
//       }`
//     }
//   >
//     {icon} <span>{label}</span>
//   </NavLink>
// );

// const Bar = ({ label, value, color }) => (
//   <div className="flex-1 flex flex-col items-center gap-8 h-full justify-end group cursor-pointer">
//     <div className="relative w-full flex flex-col items-center justify-end h-full">
//       <div
//         className={`w-full max-w-[65px] ${color} rounded-3xl transition-all duration-1000 shadow-lg relative group-hover:-translate-y-3 group-hover:shadow-2xl`}
//         style={{
//           height: `${Math.min((value / 25) * 100, 100)}%`,
//           minHeight: "12px",
//         }}
//       >
//         <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl">
//           {value}
//         </div>
//       </div>
//     </div>
//     <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest leading-none text-center group-hover:text-stone-900 transition-colors">
//       {label}
//     </span>
//   </div>
// );

// export default Dashboard;
