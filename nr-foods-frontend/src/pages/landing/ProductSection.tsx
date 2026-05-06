import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { ShoppingCart, CreditCard } from "lucide-react";
import api from "../../utils/api";

const ProductSection = () => {
  const navigate = useNavigate();

  // 🔥 Quantity state (default 1)
  const [quantity, setQuantity] = useState(1);

  // 🔥 PAYMENT FUNCTION (UPDATED)
 const handlePayment = async (
  price: number,
  product: string,
  qty: number
) => {
  try {
    const total = price * qty;

    // ✅ Token
    const token = localStorage.getItem("token");

    // ✅ User login check
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    // 1️⃣ Create Razorpay order
    const { data } = await api.post(
      "/payment/create-order",
      {
        amount: total,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      handler: async function (response: any) {
        // 2️⃣ Verify payment + Save order
        await api.post(
          "/payment/verify",
          {
            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,

            product,
            amount: total,
            quantity: qty,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("✅ Payment Successful!");

        navigate("/my-orders");
      },
    };

    const rzp = new (window as any).Razorpay(
      options
    );

    rzp.open();
  } catch (err) {
    console.error(err);

    alert("Payment failed");
  }
};

  const products = [
    { id: 1, name: "20L Bottle Cold", price: 30, image: "/shell/cold.png", tag: "Best Seller" },
    { id: 2, name: "20L Bottle Hot", price: 25, image: "/shell/hot.png", tag: "Popular" },
    { id: 3, name: "Bisleri 200ml (Box of 48)", price: 220, image: "/shell/bisleri.png", tag: "Hot" },
    { id: 4, name: "Yes 200ml (Box of 48)", price: 170, image: "/shell/yes.png", tag: "Hot" },
  ];

  return (
    <div className="py-20 px-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-8 rounded-3xl shadow-xl text-center">

            <img src={p.image} className="h-48 mx-auto mb-4" />

            <h3 className="text-xl font-bold">{p.name}</h3>

            <p className="text-gray-500 mb-4">
              Premium mineral water
            </p>

            <div className="text-2xl font-bold text-blue-600 mb-4">
              ₹{p.price}
            </div>

            {/* 🔥 Quantity Selector */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                -
              </button>

              <span className="font-bold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            <div className="flex gap-3">
              {/* Order Page */}
              <button
                onClick={() => navigate(`/order/${p.id}`)}
                className="flex-1 bg-blue-500 text-white py-3 rounded-xl"
              >
                <ShoppingCart className="inline mr-2" />
                Order
              </button>

              {/* 🔥 Direct Payment */}
              <button
                onClick={() => handlePayment(p.price, p.name, quantity)}
                className="flex-1 bg-green-500 text-white py-3 rounded-xl"
              >
                <CreditCard className="inline mr-2" />
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSection;