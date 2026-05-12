import { useEffect, useState } from "react";
import api from "../utils/api";

const Users = () => {

  const [users, setUsers] =
    useState<any[]>([]);

  const fetchUsers = async () => {

    try {

      const res =
        await api.get(
          "/auth/all-users"
        );

      setUsers(res.data);

    } catch (error) {

      console.error(error);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const deleteUser =
    async (id: number) => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete) return;

      try {

        await api.delete(
          `/auth/delete-user/${id}`
        );

        alert(
          "User deleted successfully"
        );

        fetchUsers();

      } catch (error) {

        console.error(error);

        alert("Delete failed");
      }
    };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        👥 All Users
      </h1>

      <div className="grid gap-4">

        {users.map((user) => (

          <div
            key={user.id}
            className="bg-white p-5 rounded-2xl shadow border"
          >

            <p>
              <strong>ID:</strong>
              {" "}
              {user.id}
            </p>

            <p>
              <strong>Name:</strong>
              {" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>
              {" "}
              {user.email}
            </p>

            <p>
              <strong>Role:</strong>
              {" "}
              {user.role}
            </p>

            <button
              onClick={() =>
                deleteUser(user.id)
              }
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete User
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;