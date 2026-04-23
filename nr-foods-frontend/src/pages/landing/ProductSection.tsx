import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProductSection = () => {
  const navigate = useNavigate();
  const [qr, setQr] = useState("");

 const handlePayment = (price: number) => {
  const upiId = "keyurdivan-1@okaxis"; // ✅ correct
  const name = "NR FOODS";

  const upiUrl = `upi://pay?pa=${upiId}&pn=${name}&am=${price}&cu=INR&tn=Order Payment`;

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  if (isMobile) {
    const intentUrl = `intent://pay?pa=${upiId}&pn=${name}&am=${price}&cu=INR&tn=Order#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;

    window.location.href = intentUrl;

    // fallback
    setTimeout(() => {
      window.location.href = upiUrl;
    }, 1500);
  } else {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      upiUrl
    )}`;
    setQr(qrUrl);
  }
};
  const products = [
    { id: 1, name: "20L Bottle", price: 1, image: "/images/p1.png", tag: "Best Seller" },
    { id: 2, name: "10L Bottle", price: 30, image: "/images/p2.png", tag: "Popular" },
    { id: 3, name: "1L Pack", price: 60, image: "/images/p3.png", tag: "Hot" },
  ];

  return (
    <div className="mt-20 px-10 bg-[#f6f9fc] py-16">

      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Available Bottles 💧
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-6 text-center">

            <img src={p.image} className="w-full h-40 object-contain" />

            <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>

            <p className="text-gray-400 text-sm mt-2">
              Fresh mineral water for daily use.
            </p>

            <div className="mt-4 text-blue-600 text-xl font-bold">
              ₹{p.price}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => navigate(`/order/${p.id}`)}
                className="w-full bg-blue-200 py-2 rounded-full"
              >
                🛒 Buy
              </button>

              <button
                onClick={() => handlePayment(p.price)}
                className="w-full bg-green-500 text-white py-2 rounded-full"
              >
                💳 Pay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 QR Code (Desktop only) */}
      {qr && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl text-center">
            <h3 className="mb-4 font-bold">Scan & Pay</h3>

            <img src={qr} alt="QR" className="mx-auto" />

            <button
              onClick={() => setQr("")}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSection;