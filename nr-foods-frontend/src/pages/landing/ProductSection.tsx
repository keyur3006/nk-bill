import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, CreditCard, X } from "lucide-react";
import api from "../../utils/api";
const ProductSection = () => {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");

 const handlePayment = async (price: number, product: string) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")!);

    // 1. Create order
    const { data } = await api.post("/payment/create-order", {
      amount: price,
    });

    const options = {
      key: "rzp_test_xxxxx", // 👈 TEST key
      amount: data.amount,
      currency: "INR",
      order_id: data.id,

      handler: async function (response: any) {
        // 2. Verify payment
        await api.post("/payment/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          userId: user.id,
          product: product,
          amount: price,
        });

        alert("✅ Payment Successful!");
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed");
  }
};

  const products = [
    { id: 1, name: "20L Bottle", price: 200, image: "/images/p1.png", tag: "Best Seller" },
    { id: 2, name: "10L Bottle", price: 120, image: "/images/p2.png", tag: "Popular" },
    { id: 3, name: "1L Pack (Box of 12)", price: 240, image: "/images/p3.png", tag: "Hot" },
  ];

  return (
    <div className="py-24 px-6 md:px-10 bg-surface-50 relative overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
          Choose Your <span className="text-gradient">Pure Hydration</span>
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto text-lg leading-relaxed">
          Select from our range of sizes perfectly suited for your home, office, or events.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[3rem] shadow-xl shadow-blue-900/5 p-8 text-center border border-white hover:border-blue-100 transition-all duration-500 hover:shadow-2xl"
          >
            <div className="relative mb-8 pt-8 px-4 h-64 flex items-center justify-center bg-blue-50/50 rounded-[2.5rem] group-hover:bg-blue-100/50 transition-colors">
              <span className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-lg shadow-blue-500/20 uppercase">
                {p.tag}
              </span>
              <img src={p.image} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" alt={p.name} />
            </div>

            <h3 className="text-2xl font-bold text-blue-950 mb-3">{p.name}</h3>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Premium mineral water, tested and certified for safe daily consumption.
            </p>

            <div className="text-3xl font-extrabold text-blue-600 mb-8">
              ₹{p.price}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/order/${p.id}`)}
                className="flex-1 bg-blue-50 text-blue-600 py-4 rounded-2xl font-bold hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Order Now
              </button>

              <button
               onClick={() => handlePayment(p.price, p.name)}
                className="flex-1 bg-green-500 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Direct Pay
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 QR Code Modal */}
      <AnimatePresence>
        {qr && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-blue-900/40 backdrop-blur-md z-100 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-10 rounded-[3rem] shadow-2xl max-w-sm w-full text-center relative border border-white"
            >
              <button
                onClick={() => setQr("")}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>

              <h3 className="text-2xl font-bold text-blue-900 mb-2">Scan to Pay</h3>
              <p className="text-gray-500 mb-8">Pay securely using any UPI app</p>

              <div className="bg-gray-50 p-6 rounded-4XL border border-gray-100 mb-8 inline-block">
                <img src={qr} alt="QR" className="mx-auto w-48 h-48" />
              </div>

              <div className="text-blue-600 font-bold text-lg mb-8">
                Scan via Google Pay, PhonePe or Paytm
              </div>

              <button
                onClick={() => setQr("")}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSection;
