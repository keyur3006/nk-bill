import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Authenticating...");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (!res.data.token) {
        throw new Error("Token not received");
      }

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!", { id: toastId });

      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || error.message || "Login failed",
        { id: toastId }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
          <h1 className="text-3xl font-black text-white text-center mb-6">
            NR FOODS
          </h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded bg-white/10 text-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded bg-white/10 text-white"
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-600 p-3 rounded text-white flex justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;