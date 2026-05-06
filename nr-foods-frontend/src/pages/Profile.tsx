import { useEffect, useState } from "react";
import api from "../utils/api";

const Profile = () => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: "",
  });

  // ✅ Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token =
          localStorage.getItem("token");

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
  }, []);

  // ✅ Input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Save profile
  const handleSave = async () => {
    try {
      const token =
        localStorage.getItem("token");

      await api.put(
        "/profile/update",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Address Saved");
    } catch (error) {
      console.error(error);

      alert("Failed to save");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">
        My Address
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Address
        </button>
      </div>
    </div>
  );
};

export default Profile;