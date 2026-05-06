import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/api";

const products = [
  { id: 1, name: "20L Bottle Cold", price: 30 },
  { id: 2, name: "20L Bottle Hot", price: 25 },
  { id: 3, name: "Bisleri 200ml", price: 220 },
  { id: 4, name: "Yes 200ml", price: 170 },
];

const OrderPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="p-10 text-center text-red-500">
        Product not found
      </div>
    );
  }

  const total = product.price * qty;

  const handlePayment = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user")!);

      const { data } = await api.post("/payment/create-order", {
        amount: total,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: "INR",
        order_id: data.id,

        handler: async function (response: any) {

          await api.post("/payment/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,

            userId: user.id,
            product: product.name,
            amount: total,
            quantity: qty,
          });

          alert("✅ Order placed successfully!");

          navigate("/my-orders");
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.open();

    } catch (error) {

      console.error(error);

      alert("❌ Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg">

        {/* HOME BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          ← Back To Home
        </button>

        {/* TITLE */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {product.name}
        </h1>

        {/* PRICE */}
        <p className="text-xl text-gray-700 mb-4">
          Price: ₹{product.price}
        </p>

        {/* QUANTITY */}
        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Quantity
          </label>

          <input
            type="number"
            value={qty}
            min={1}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TOTAL */}
        <h2 className="text-2xl font-bold mb-6 text-green-600">
          Total: ₹{total}
        </h2>

        {/* PAYMENT BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl text-lg font-bold transition"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
};

export default OrderPage;