import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Loader2, UserCog } from "lucide-react";

const ManageUser = () => {
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
  });

  const handleRoleChange = (id, name, role) => {
    fetch(`https://wedding-app-server-eight.vercel.app/users/role/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          // ২ সেকেন্ডের মধ্যে ড্যাশবোর্ড আপডেট করার ম্যাজিক লাইন
          window.dispatchEvent(new Event("roleUpdated"));
          Swal.fire("Success!", `${name} is now an ${role}`, "success");
        }
      });
  };

  if (isLoading)
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="p-10 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-10 text-primary">
        <UserCog size={40} />
        <h1 className="text-4xl font-bold">Manage Users</h1>
      </div>
      <div className="overflow-x-auto shadow-xl rounded-3xl bg-white border">
        <table className="table w-full text-left">
          <thead>
            <tr className="bg-base-200 uppercase text-xs">
              <th>No.</th>
              <th>User Info</th>
              <th>Role</th>
              <th>Assign Permission</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-base-100">
                <td>{index + 1}</td>
                <td>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </td>
                <td>
                  <span
                    className={`badge ${user.role === "admin" ? "badge-primary" : "badge-ghost"}`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-xs"
                    defaultValue={user.role || "user"}
                    onChange={(e) =>
                      handleRoleChange(user._id, user.name, e.target.value)
                    }
                  >
                    <option value="user">Assign User</option>
                    <option value="admin">Assign Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ManageUser;
