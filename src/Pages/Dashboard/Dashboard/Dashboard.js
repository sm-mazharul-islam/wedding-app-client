// import React from "react";
// import { Link } from "react-router-dom";
// import DashboardLayout from "../../../Layout/DashboardLayout";

// const Dashboard = () => {
//   return (
//     <div className="drawer lg:drawer-open">
//       <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col items-center justify-center">
//         {/* Page content here */}
//         <DashboardLayout />
//         <label
//           htmlFor="my-drawer-2"
//           className="btn btn-primary drawer-button lg:hidden"
//         >
//           Open drawer
//         </label>
//       </div>
//       <div className="drawer-side">
//         {/* <label
//           htmlFor="my-drawer-2"
//           aria-label="close sidebar"
//           className="drawer-overlay"
//         ></label> */}
//         <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
//           {/* Sidebar content here */}
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="allOrderProduct">All Order Product</Link>
//           </li>
//           <li>
//             <Link to="add-reviews">Add reviews</Link>
//           </li>
//           <li>
//             <Link to="create-admin">Create Admin</Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//!
import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  Box,
  Users,
  Store,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isDashboardRoot = location.pathname === "/dashboard";

  return (
    // 1. h-screen and overflow-hidden prevents the whole body from scrolling
    <div className="flex h-screen bg-[#F4F4F4] font-sans text-[#1A1D1F] overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* ================= SIDEBAR (FIXED) ================= */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#F4F4F4] border-r border-gray-200 transform transition-transform duration-300 ease-in-out p-6
        lg:translate-x-0 lg:static lg:block h-full
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded-sm rotate-45"></div>
            </div>
            <button
              className="lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto">
            <NavItem
              to="/dashboard"
              icon={<LayoutGrid size={20} />}
              label="Dashboard"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="all-packages"
              icon={<LayoutGrid size={20} />}
              label="All Packages"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="add-package"
              icon={<LayoutGrid size={20} />}
              label="Add Package"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="add-reviews"
              icon={<Users size={20} />}
              label="Add Reviews"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="/"
              icon={<Store size={20} />}
              label="Home"
              onClick={() => setIsSidebarOpen(false)}
            />
            <NavItem
              to="add-cart"
              icon={<BarChart3 size={20} />}
              label="View Cart"
              onClick={() => setIsSidebarOpen(false)}
            />
          </nav>
        </div>
      </aside>

      {/* ================= MAIN CONTENT (SCROLLABLE) ================= */}
      {/* 2. flex-1 and overflow-y-auto makes only this section scroll */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto">
        {/* Mobile Header (Stays at top) */}
        <header className="flex items-center justify-between p-4 lg:hidden bg-white border-b sticky top-0 z-30">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
        </header>

        <div className="p-4 md:p-8 lg:p-12 max-w-[1440px] w-full mx-auto">
          {isDashboardRoot && (
            <header className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Product overview
              </h1>
            </header>
          )}

          {/* This is where ViewCart or other components will render */}
          <div className="bg-white rounded-[32px] p-4 md:p-8 shadow-sm border border-gray-100">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <li>
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 rounded-xl font-medium transition-all ${
          isActive
            ? "bg-white shadow-sm text-black"
            : "text-gray-500 hover:bg-white"
        }`
      }
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{label}</span>
      </div>
    </NavLink>
  </li>
);

export default Dashboard;
