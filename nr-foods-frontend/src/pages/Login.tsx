import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
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

      localStorage.setItem("token", res.data.token);

      toast.success("Login successful!", { id: toastId });

      navigate("/dashboard");

    } catch (error: any) {

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message || "Login failed",
        { id: toastId }
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] items-center justify-center p-6 relative overflow-hidden font-inter">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/10">

          <div className="text-center mb-10">

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                <LogIn size={28} />
              </div>
            </div>

            <h1 className="text-3xl font-black text-white">
              NR <span className="text-blue-500">FOODS</span>
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Management Login
            </p>

          </div>

          <div className="space-y-6">

            <div className="relative">

              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="admin@nrfoods.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />

            </div>

            <div className="relative">

              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white"
              />

            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
            >

              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Login
                  <LogIn size={18} />
                </>
              )}

            </button>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;