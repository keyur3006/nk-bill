import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ correct place

  // ✅ Admin protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role !== "ADMIN") {
      alert("Access Denied - Admin Only");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "https://api.keyurbill.online/api/admin/create-user",
        { email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Karigar Created ✅");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">
          Create Karigar
        </h2>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleCreate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Karigar
        </button>
      </div>
    </div>
  );
};

export default AdminPage;