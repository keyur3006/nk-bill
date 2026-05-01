import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        email,
        password,
      });

      toast.success("Registered successfully");

      // 👉 direct login page par mokli do
      navigate("/login");

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] items-center justify-center">
      <div className="bg-white/5 p-10 rounded-2xl w-full max-w-md">
        <h2 className="text-white text-2xl mb-5 text-center">Register</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-white/10 text-white rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 bg-white/10 text-white rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 p-3 rounded text-white"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </div>
    </div>
  );
};

export default Register;