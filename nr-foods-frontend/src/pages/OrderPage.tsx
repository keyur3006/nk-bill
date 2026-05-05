import { useParams } from "react-router-dom";
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
  const product = products.find(p => p.id === Number(id));

  const [qty, setQty] = useState(1);

  if (!product) return <div>Product not found</div>;

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
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      <p className="text-lg">Price: ₹{product.price}</p>

      <div className="mt-6">
        <label>Quantity:</label>
        <input
          type="number"
          value={qty}
          min={1}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border p-2 ml-2"
        />
      </div>

      <h2 className="mt-6 text-xl font-bold">
        Total: ₹{total}
      </h2>

      <button
        onClick={handlePayment}
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl"
      >
        Pay Now
      </button>
    </div>
  );
};

export default OrderPage;