import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import logo from "../../../Images/logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cartData, setCartData] = useState({ count: 0, subtotal: 0 });

  const handleLogOut = () => {
    logOut()
      .then(() => {
        // Optional: Clear local cart on logout if desired
        // localStorage.removeItem("cart");
        // updateCartDisplay();
      })
      .catch((err) => console.log(err));
  };

  const updateCartDisplay = () => {
    // Only attempt to load if a user is logged in
    if (user?.uid) {
      const userCartKey = `cart_${user.uid}`;
      const cart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

      const count = cart.reduce((total, item) => total + item.quantity, 0);
      const subtotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      setCartData({ count, subtotal });
    } else {
      // Reset display if no user is logged in
      setCartData({ count: 0, subtotal: 0 });
    }
  };

  useEffect(() => {
    updateCartDisplay();
    window.addEventListener("cartUpdated", updateCartDisplay);
    window.addEventListener("storage", updateCartDisplay);

    return () => {
      window.removeEventListener("cartUpdated", updateCartDisplay);
      window.removeEventListener("storage", updateCartDisplay);
    };
  }, []);

  const menuItems = (
    <React.Fragment>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/eventCoordination">Event Coordination</Link>
      </li>
      <li>
        <Link to="/gallery">Gallery</Link>
      </li>
      <li>
        <Link to="/weddingShop">Bridal Shop</Link>
      </li>
      <li>
        <Link to="/findYourMatch">Find Your Match</Link>
      </li>
      <li>
        <Link to="/about">Our Story</Link>
      </li>
      {user?.uid ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className="btn btn-ghost normal-case"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </React.Fragment>
  );

  return (
    /* ADDED: 'sticky top-0 z-50 shadow-sm' for Fixed Navbar */
    <div
      className="navbar bg-base-100 flex justify-between sticky top-0 z-50 lg:px-52"
      style={{ backgroundColor: "#FAF7F6" }} // Slightly more opaque for sticky readability
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="normal-case text-xl mx-auto">
          <img src={logo} className="w-[75px] mx-auto" alt="logo" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>

        <div className="flex items-center space-x-3 ml-4">
          {/* User Profile UI - Only show if logged in */}
          {user?.uid && (
            <>
              <img
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                src={user?.photoURL || "https://i.ibb.co/3S3S8RS/avatar.png"}
                alt="profile"
              />
              <p className="text-black font-medium hidden xl:block">
                {user?.displayName || "User"}
              </p>
            </>
          )}

          {/* CART SECTION - Wrapped in user check to HIDE on logout */}
          {user?.uid && (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item badge-primary">
                      {cartData.count}
                    </span>
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow-xl border border-gray-100"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {cartData.count} Items
                    </span>
                    <span className="text-info font-semibold">
                      Subtotal: ${cartData.subtotal}
                    </span>
                    <div className="card-actions">
                      <Link to="/dashboard/add-cart" className="w-full">
                        <button className="btn btn-primary btn-sm btn-block">
                          View cart
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
