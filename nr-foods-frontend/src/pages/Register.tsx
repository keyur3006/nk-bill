import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [showOtp, setShowOtp] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  // ✅ REGISTER
  const handleRegister = async () => {

    if (!email || !password) {

      toast.error("All fields required");

      return;
    }

    setLoading(true);

    try {

      await api.post(
        "/auth/register",
        {
          email,
          password,
        }
      );

      toast.success(
        "OTP sent to your email"
      );

      // ✅ SAME PAGE OTP SHOW
      setShowOtp(true);

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ||
        "Register failed"
      );

    } finally {

      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const verifyOtp = async () => {

    if (!otp) {

      toast.error("Enter OTP");

      return;
    }

    try {

      const res = await api.post(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(
        res.data.message
      );

      // ✅ LOGIN PAGE
      navigate("/login");

    } catch (err: any) {

      toast.error(
        err.response?.data?.message ||
        "OTP verification failed"
      );
    }
  };

  return (

    <div className="flex min-h-screen bg-[#020617] items-center justify-center">

      <div className="bg-white/5 p-10 rounded-2xl w-full max-w-md">

        <h2 className="text-white text-2xl mb-5 text-center">

          Register

        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-3 mb-3 bg-white/10 text-white rounded outline-none"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-3 mb-3 bg-white/10 text-white rounded outline-none"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-green-600 hover:bg-green-700 transition p-3 rounded text-white"
        >
          {
            loading
              ? "Loading..."
              : "Register"
          }
        </button>

        {/* OTP SECTION */}
        {
          showOtp && (

            <div className="mt-5">

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                className="w-full p-3 mb-3 bg-white/10 text-white rounded outline-none"
                onChange={(e) =>
                  setOtp(e.target.value)
                }
              />

              <button
                onClick={verifyOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded text-white"
              >
                Verify OTP
              </button>

            </div>
          )
        }

      </div>

    </div>
  );
};

export default Register;