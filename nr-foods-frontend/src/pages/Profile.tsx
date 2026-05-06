import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const res = await api.get(
          "/profile/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setForm({
          name: res.data.name || "",
          mobile: res.data.mobile || "",
          address: res.data.address || "",
          city: res.data.city || "",
          pincode: res.data.pincode || "",
        });

      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE PROFILE ================= */

  const handleSave = async () => {

    // ✅ Name Validation
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }

    // ✅ Mobile Validation
    if (!/^\d{10}$/.test(form.mobile)) {
      toast.error(
        "Mobile number must be 10 digits"
      );
      return;
    }

    // ✅ Address Validation
    if (!form.address.trim()) {
      toast.error("Address is required");
      return;
    }

    // ✅ City Validation
    if (!form.city.trim()) {
      toast.error("City is required");
      return;
    }

    // ✅ Pincode Validation
    if (!/^\d{6}$/.test(form.pincode)) {
      toast.error(
        "Pincode must be 6 digits"
      );
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      await api.put(
        "/profile/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ✅ Profile Completed
      localStorage.setItem(
        "profileCompleted",
        "true"
      );

      toast.success("Address Saved");

      // ✅ Redirect Home
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      console.error(error);

      toast.error("Failed to save");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">

      <h2 className="text-3xl font-bold mb-6 text-center">
        My Address
      </h2>

      <div className="space-y-4">

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Mobile */}
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* City */}
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Pincode */}
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded w-full"
        >
          Save Address
        </button>

      </div>
    </div>
  );
};

export default Profile;