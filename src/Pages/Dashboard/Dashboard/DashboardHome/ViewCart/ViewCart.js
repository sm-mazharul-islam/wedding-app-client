import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../../../contexts/AuthProvider";
import { useQueryClient } from "@tanstack/react-query"; // 1. Import QueryClient

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient(); // 2. Initialize QueryClient

  const userCartKey = user ? `cart_${user.uid}` : null;

  const loadCart = () => {
    if (userCartKey) {
      const data = JSON.parse(localStorage.getItem(userCartKey) || "[]");
      setCartItems(data);
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    window.addEventListener("storage", loadCart);
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("storage", loadCart);
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, [userCartKey]);

  const removeItem = (id) => {
    if (!userCartKey) return;
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };
  const handleCheckout = async () => {
    try {
      // 1. Send the update to the database
      const updatePromises = cartItems.map((item) =>
        fetch(`http://localhost:5000/servicesPackage/${item.id}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ quantity: item.quantity }),
        }),
      );
      await Promise.all(updatePromises);

      // 2. FORCE THE REFRESH
      // This makes the "5 Items" update to the new number instantly
      queryClient.invalidateQueries(["servicesPackage"]);

      // 3. Clear the cart
      localStorage.removeItem(userCartKey);
      setCartItems([]);
      window.dispatchEvent(new Event("cartUpdated"));

      Swal.fire("Success", "Stock updated!", "success");
    } catch (err) {
      console.error(err);
    }
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
        <h2 className="text-3xl font-serif font-bold text-gray-400">
          Please login to view your cart
        </h2>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
        <h2 className="text-3xl font-serif font-bold text-gray-400">
          Your cart is empty
        </h2>
        <p className="mt-2 text-gray-500">
          Add some beautiful wedding items to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-5 lg:p-10 bg-base-100 min-h-screen">
      <h2 className="text-4xl font-serif font-bold mb-8">Shopping Cart</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-base-200 transition-colors"
                >
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div className="font-bold text-lg">{item.name}</div>
                    </div>
                  </td>
                  <td className="font-medium">${item.price}</td>
                  <td>
                    <span className="badge badge-ghost font-bold p-3">
                      {item.quantity}
                    </span>
                  </td>
                  <td className="font-bold text-primary">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="btn btn-error btn-xs btn-outline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-base-200 p-8 rounded-2xl h-fit sticky top-24">
          <h3 className="text-2xl font-bold mb-6">Summary</h3>
          <div className="flex justify-between mb-4 border-b border-gray-300 pb-2">
            <span>Total Items:</span>
            <span className="font-bold">{cartItems.length}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold mt-6 mb-8">
            <span>Subtotal:</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="btn btn-primary w-full btn-lg shadow-xl shadow-primary/20"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
