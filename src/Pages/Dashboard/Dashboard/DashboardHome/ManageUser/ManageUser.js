import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  Loader2,
  UserCog,
  Trash2,
  Mail,
  User as UserIcon,
  ShieldCheck,
} from "lucide-react";

const ManageUser = () => {
  const queryClient = useQueryClient();

  // ডাটা ফেচিং
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  //  (Admin/User)
  const handleRoleChange = (id, name, role) => {
    fetch(`http://localhost:5000/users/role/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          queryClient.invalidateQueries(["users"]);
          Swal.fire({
            title: "Updated!",
            text: `${name || "User"} is now an ${role}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            customClass: { popup: "rounded-[32px]" },
          });
        }
      });
  };

  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Removing ${name || "this user"} will force them to logout!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-[32px] border border-gray-100 shadow-2xl p-8",
        confirmButton:
          "bg-red-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all mx-2",
        cancelButton:
          "bg-gray-100 text-gray-500 px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all mx-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              queryClient.invalidateQueries(["users"]);
              Swal.fire({
                title: "Deleted!",
                text: "User session terminated.",
                icon: "success",
                timer: 3000, // 3 seconds
                timerProgressBar: true,
                confirmButtonColor: "#1A1D1F",
              });
            }
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF7F6]">
        <Loader2 className="animate-spin text-[#1A1D1F]" size={48} />
      </div>
    );

  return (
    <div className="p-5 lg:p-10 min-h-screen ">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-10 text-[#1A1D1F]">
        <div className="p-4 bg-[#1A1D1F] text-white rounded-[20px] shadow-lg shadow-[#1A1D1F]/20">
          <UserCog size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight leading-none">
            Manage Users
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-widest">
            Administrator Control Panel
          </p>
        </div>
      </div>

      {/* --- Desktop Table View --- */}
      <div className="hidden lg:block overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[35px] bg-white border border-gray-100">
        <table className="table w-full border-collapse">
          <thead>
            <tr className="bg-[#1A1D1F] text-white/50 uppercase text-[10px] tracking-[2px] font-black">
              <th className="py-6 pl-8">No.</th>
              <th>User Details</th>
              <th>Status</th>
              <th>Assign Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-[#FAF7F6]/50 transition-colors border-b border-gray-50 last:border-0"
              >
                <td className="pl-8 font-mono text-gray-300 text-xs">
                  {index + 1}
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FAF7F6] rounded-2xl overflow-hidden border border-gray-100 shadow-inner flex items-center justify-center">
                      {user.image ? (
                        <img
                          src={user.image}
                          className="w-full h-full object-cover"
                          alt={user.name}
                        />
                      ) : (
                        <UserIcon className="text-gray-300" size={20} />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-black text-[#1A1D1F] text-sm">
                        {user.name || "Anonymous"}
                      </span>
                      <span className="text-[11px] text-gray-400 italic flex items-center gap-1">
                        <Mail size={10} /> {user.email}
                      </span>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold border-none py-3 px-4 rounded-lg ${user.role === "admin" ? "bg-[#1A1D1F] text-white" : "bg-gray-100 text-gray-500"}`}
                  >
                    {user.role === "admin" && (
                      <ShieldCheck size={12} className="mr-1" />
                    )}
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-xs rounded-xl h-10 bg-[#FAF7F6] border-none focus:ring-1 focus:ring-[#1A1D1F]/10 font-bold text-xs"
                    defaultValue={user.role || "user"}
                    onChange={(e) =>
                      handleRoleChange(user._id, user.name, e.target.value)
                    }
                  >
                    <option value="user">Assign User</option>
                    <option value="admin">Make Admin</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile Card View --- */}
      <div className="lg:hidden flex flex-col gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-[30px] shadow-sm border border-gray-100 relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#FAF7F6] rounded-[20px] flex items-center justify-center border border-gray-50 overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                ) : (
                  <UserIcon size={24} className="text-gray-200" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-[#1A1D1F] leading-tight">
                  {user.name || "Unknown"}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium italic">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6 pt-5 border-t border-gray-50">
              <select
                className="select select-sm flex-1 rounded-xl bg-[#FAF7F6] border-none text-xs font-bold"
                defaultValue={user.role || "user"}
                onChange={(e) =>
                  handleRoleChange(user._id, user.name, e.target.value)
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={() => handleDeleteUser(user._id, user.name)}
                className="btn btn-sm bg-red-50 text-red-500 border-none rounded-xl px-4"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
