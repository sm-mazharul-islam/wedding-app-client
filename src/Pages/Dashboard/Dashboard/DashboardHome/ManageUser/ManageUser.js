import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; //
import Swal from "sweetalert2";
import {
  Loader2,
  UserCog,
  Trash2,
  ShieldCheck,
  Mail,
  User,
} from "lucide-react";

const ManageUser = () => {
  const queryClient = useQueryClient(); // কুয়েরি ক্যাশ ইনভ্যালিড করার জন্য

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "https://wedding-app-server-eight.vercel.app/users",
      );
      return res.json();
    },
    // উইন্ডো ফোকাস করলে বা নতুন ডাটা আসলে অটো ফেচ হবে
    refetchOnWindowFocus: true,
  });

  // রোল আপডেট ফাংশন
  const handleRoleChange = (id, name, role) => {
    fetch(`https://wedding-app-server-eight.vercel.app/users/role/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // রিফ্রেশ ছাড়া আপডেট নিশ্চিত করার জন্য
          queryClient.invalidateQueries(["users"]);
          window.dispatchEvent(new Event("roleUpdated"));

          Swal.fire({
            title: "Updated!",
            text: `${name} is now an ${role}`,
            icon: "success",
            confirmButtonColor: "#1A1D1F",
            customClass: {
              popup: "rounded-[32px] border border-gray-100 shadow-2xl p-8",
            },
          });
        }
      });
  };

  // ইউজার ডিলিট ফাংশন (সাথে অটো লগ-আউট লজিক)
  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to remove ${name}. This action will also force log out the user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1A1D1F",
      color: "#1A1D1F",
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete it!",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-[32px] border border-gray-100 shadow-2xl p-8",
        title: "text-2xl font-black text-[#1A1D1F]",
        confirmButton:
          "bg-red-500 text-white px-8 py-3 rounded-2xl font-bold hover:bg-red-600 transition-all mx-2",
        cancelButton:
          "bg-gray-100 text-gray-500 px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all mx-2",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://wedding-app-server-eight.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // রিফ্রেশ ছাড়াই অ্যাডমিন প্যানেল থেকে ইউজার সরিয়ে ফেলা
              queryClient.invalidateQueries(["users"]); //

              Swal.fire({
                title: "Deleted!",
                text: "The user has been removed and session terminated.",
                icon: "success",
                background: "#FFFFFF",
                color: "#1A1D1F",
                customClass: {
                  popup: "rounded-[32px] border border-gray-100 shadow-2xl",
                  title: "text-2xl font-black text-[#1A1D1F]",
                  confirmButton:
                    "bg-primary text-white px-10 py-3 rounded-2xl font-bold hover:bg-primary-focus transition-all border-none",
                },
                buttonsStyling: false,
                showConfirmButton: true,
                confirmButtonText: "Got it!",
                timer: 3000,
                timerProgressBar: true,
              });
            }
          });
      }
    });
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );

  return (
    <div className="p-5 lg:p-10 animate-in fade-in duration-500 min-h-screen bg-[#F8F9FA]">
      <div className="flex items-center gap-4 mb-10 text-primary">
        <div className="p-3 bg-primary/10 rounded-2xl">
          <UserCog size={32} />
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-[#1A1D1F]">
          Manage Users
        </h1>
      </div>

      {/* --- Desktop View (Table) --- */}
      <div className="hidden lg:block overflow-hidden shadow-2xl rounded-[32px] bg-white border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest font-black">
              <th className="py-6 pl-8 font-black">No.</th>
              <th className="font-black">User Info</th>
              <th className="font-black">Current Role</th>
              <th className="font-black">Assign Permission</th>
              <th className="text-center font-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50/50 transition-colors border-b border-gray-50 last:border-0"
              >
                <td className="pl-8 font-mono text-gray-400">{index + 1}</td>
                <td>
                  <div className="flex flex-col">
                    <span className="font-bold text-[#1A1D1F]">
                      {user.name}
                    </span>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Mail size={10} /> {user.email}
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold border-none py-3 px-4 rounded-lg ${user.role === "admin" ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"}`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-xs rounded-lg h-9"
                    defaultValue={user.role || "user"}
                    onChange={(e) =>
                      handleRoleChange(user._id, user.name, e.target.value)
                    }
                  >
                    <option value="user">Assign User</option>
                    <option value="admin">Assign Admin</option>
                  </select>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleDeleteUser(user._id, user.name)}
                    className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Mobile View (Optimized Card Design) --- */}
      <div className="lg:hidden flex flex-col gap-5">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex flex-col gap-5 relative overflow-hidden"
          >
            {user.role === "admin" && (
              <div className="absolute top-0 right-0 bg-primary/10 text-primary px-4 py-1.5 rounded-bl-2xl flex items-center gap-1">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Admin
                </span>
              </div>
            )}

            <div className="flex items-center gap-4 mt-2">
              <div className="w-14 h-14 bg-gray-50 rounded-[20px] flex items-center justify-center text-primary border border-gray-100 shadow-inner">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover rounded-[20px]"
                  />
                ) : (
                  <User size={24} className="opacity-40" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-black text-lg text-[#1A1D1F] leading-tight mb-0.5">
                  {user.name}
                </h3>
                <p className="text-xs text-gray-400 font-mono flex items-center gap-1">
                  <Mail size={10} /> {user.email}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-gray-50">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest">
                  Role Status
                </span>
                <div
                  className={`text-xs font-bold py-2 px-3 rounded-xl text-center ${user.role === "admin" ? "bg-primary/5 text-primary border border-primary/10" : "bg-gray-50 text-gray-400 border border-gray-100"}`}
                >
                  {user.role || "user"}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase text-gray-400 font-black tracking-widest">
                  Permission
                </span>
                <select
                  className="select select-bordered select-sm rounded-xl text-xs h-[38px] min-h-[38px]"
                  defaultValue={user.role || "user"}
                  onChange={(e) =>
                    handleRoleChange(user._id, user.name, e.target.value)
                  }
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => handleDeleteUser(user._id, user.name)}
              className="btn btn-error btn-sm w-full h-11 rounded-2xl flex items-center justify-center gap-2 bg-red-50 text-red-500 border-none hover:bg-red-100 transition-all font-bold"
            >
              <Trash2 size={16} />
              <span className="text-xs">Remove Profile</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUser;
