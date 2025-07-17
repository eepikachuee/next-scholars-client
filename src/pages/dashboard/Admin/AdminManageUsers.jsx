import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";

const AdminManageUsers = () => {
  const axiosSecure = useAxiosPublic();
  const queryClient = useQueryClient();
  const [filterRole, setFilterRole] = useState("all");

  // FETCH USERS
  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // FILTERED USERS
  const filteredUsers =
    filterRole === "all"
      ? users
      : users.filter((user) => user.role === filterRole);

  // UPDATE ROLE MUTATION
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, newRole }) =>
      axiosSecure.patch(`/users/role/${userId}`, { role: newRole }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Success", "User role updated successfully", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  // DELETE USER MUTATION
  const deleteUserMutation = useMutation({
    mutationFn: (userId) => axiosSecure.delete(`/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Deleted!", "User has been deleted.", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to delete user", "error");
    },
  });

  // HANDLERS
  const handleRoleChange = (userId, newRole) => {
    updateRoleMutation.mutate({ userId, newRole });
  };

  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      deleteUserMutation.mutate(userId);
    }
  };

  const handleFilter = (role) => setFilterRole(role);

  if (isLoading) return <p className="p-6">Loading users...</p>;
  if (isError) return <p className="p-6 text-red-500">Failed to load users</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Filter */}
      <div className="flex justify-end">
        <Select onValueChange={handleFilter} defaultValue="all">
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="moderator">Moderator</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value) => handleRoleChange(user._id, value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-4 py-2">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageUsers;
