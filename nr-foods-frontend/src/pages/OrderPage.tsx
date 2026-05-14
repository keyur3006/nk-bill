import { useParams, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import api from "../utils/api";

import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    name: "20L Bottle Cold",
    price: 30,
    image: "/shell/cold.png",
  },

  {
    id: 2,
    name: "20L Bottle Hot",
    price: 25,
    image: "/shell/hot.png",
  },

  {
    id: 3,
    name: "Bisleri 200ml",
    price: 220,
    image: "/shell/bisleri.png",
  },

  {
    id: 4,
    name: "Yes 200ml",
    price: 170,
    image: "/shell/yes.png",
  },
];

const areas = [
  "Kankaria",
  "Maninagar",
  "Isanpur",
  "Raipur",
  "Paldi",
  "CTM",
  "Nikol",
  "Vastral",
  "Bhulabhai park",
  "Ellisbridge",
  "Shah Alam",
  "Khokhra",
];

const OrderPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);

  const [profile, setProfile] = useState<any>(null);
  const [selectedArea, setSelectedArea] = useState("");

  /* ================= PROFILE FETCH ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await api.get("/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfile(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, []);

  /* ================= PRODUCT NOT FOUND ================= */

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">Product not found</div>
    );
  }

  /* ================= PRICE CALCULATION ================= */

  const subtotal = product.price * qty;

  const grandTotal = subtotal;

  /* ================= PAYMENT ================= */

  const handlePayment = async () => {
    try {
      // ✅ Token
      const token = localStorage.getItem("token");

      // ✅ Login check
      if (!token) {
        toast.error("Please login first");

        navigate("/login");

        return;
      }

      if (!selectedArea) {
        toast.error("Please select delivery area");
        return;
      }

      // ✅ Address check
      const profileCompleted = localStorage.getItem("profileCompleted");

      if (!profileCompleted) {
        localStorage.setItem("redirectAfterProfile", window.location.pathname);

        toast.error("Please complete address first");

        navigate("/profile");

        return;
      }

      // ✅ Create Razorpay Order
      const { data } = await api.post(
        "/payment/create-order",
        {
          amount: grandTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: "INR",

        order_id: data.id,

        name: "Keyurbill",

        description: product.name,

        handler: async function (response: any) {
          // ✅ Verify Payment
          await api.post(
            "/payment/verify",
            {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              product: product.name,

              amount: grandTotal,

              quantity: qty,
              address: profile.address,

              city: profile.city,

              pincode: profile.pincode,

              mobile: profile.mobile,

              customerName: profile.name,
              
              selectedArea,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          toast.success("Payment Successful");

          navigate("/my-orders");
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.open();
    } catch (error) {
      console.error(error);

      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {/* ================= LEFT SIDE ================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            ← Back To Home
          </button>

          {/* PRODUCT IMAGE */}
          <img src={product.image} className="h-64 mx-auto mb-6" />

          {/* PRODUCT NAME */}
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            {product.name}
          </h1>

          {/* PRICE */}
          <p className="text-2xl text-blue-600 font-bold mb-6">
            ₹{product.price}
          </p>

          {/* QUANTITY */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Quantity</label>

            <input
              type="number"
              value={qty}
              min={1}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="bg-white rounded-3xl shadow-xl p-8 h-fit">
          {/* ADDRESS */}
          <div className="bg-gray-100 p-5 rounded-2xl mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-bold">Delivery Address</h2>

              <button
                onClick={() => navigate("/profile")}
                className="text-blue-600 font-semibold"
              >
                Edit
              </button>
            </div>

            {/* AREA DROPDOWN */}

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Select Area</label>

              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-3"
              >
                <option value="">Select Your Area</option>

                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            <p className="font-semibold">{profile?.name}</p>

            <p>{profile?.mobile}</p>

            <p>{profile?.address}</p>

            <p>
              {profile?.city} - {profile?.pincode}
            </p>
          </div>

          {/* PRICE DETAILS */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>

              <span>₹{subtotal}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold text-green-600">
              <span>Total</span>

              <span>₹{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* PAYMENT BUTTON */}
          <button
            onClick={handlePayment}
            className="w-full mt-8 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-bold transition"
          >
            Continue To Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
