import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const verifyOtp = async () => {
    try {

      const res = await api.post(
  "/auth/verify-otp",

        {
          email,
          otp,
        }
      );

      alert(res.data.message);

      navigate("/login");

    } catch (error: any) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-xl w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Verify OTP
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="w-full border p-3 mb-4 rounded"
        />

        <button
          onClick={verifyOtp}
          className="w-full bg-blue-500 text-white py-3 rounded"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;