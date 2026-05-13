import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  ShoppingCart,
  CreditCard,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";

const ProductSection = () => {
  const navigate = useNavigate();

  // 🔥 Quantity state
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });

  const products = [
    {
      id: 1,
      name: "20L Bottle Cold",
      price: 30,
      image: "/shell/cold.png",
      tag: "Best Seller",
      description:
        "Fresh and purified cold mineral water bottle delivery in Ahmedabad.",
    },

    {
      id: 2,
      name: "20L Bottle Hot",
      price: 25,
      image: "/shell/hot.png",
      tag: "Popular",
      description:
        "Healthy hot drinking water bottle with fast home delivery service.",
    },

    {
      id: 3,
      name: "Bisleri 200ml (Box of 48)",
      price: 220,
      image: "/shell/bisleri.png",
      tag: "Hot",
      description:
        "Bisleri 200ml mineral water bottle box for office and event use.",
    },

    {
      id: 4,
      name: "Yes 200ml (Box of 48)",
      price: 170,
      image: "/shell/yes.png",
      tag: "Affordable",
      description:
        "Affordable pure drinking water bottle box with healthy minerals.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white py-24 px-6">

      {/* TOP HEADING */}
      <div className="text-center max-w-4xl mx-auto mb-20">

        <p className="text-sm tracking-[0.3em] uppercase font-bold text-blue-500 mb-4">
          OUR PRODUCTS
        </p>

        <h2 className="text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight">

          Premium Mineral Water <br />

          <span className="text-blue-600 italic">
            Delivery Services
          </span>

        </h2>

        <p className="mt-8 text-lg text-gray-600 leading-8">

          Order pure and healthy mineral water bottles online with
          fast delivery across Ahmedabad for homes, offices and businesses.

        </p>

      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

        {products.map((p) => (
          <article
            key={p.id}
            className="group relative bg-white/90 backdrop-blur-xl border border-blue-100 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >

            {/* TAG */}
            <div className="absolute top-5 left-5 z-20 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">

              {p.tag}

            </div>

            {/* IMAGE */}
            <div className="relative p-8 overflow-hidden">

              <img
                src={p.image}
                alt={p.name}
                className="h-56 mx-auto object-contain transition-transform duration-500 group-hover:scale-110"
              />

            </div>

            {/* CONTENT */}
            <div className="px-8 pb-8 text-center">

              {/* PRODUCT NAME */}
              <h3 className="text-2xl font-bold text-blue-950 mb-3">

                {p.name}

              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 leading-7 text-sm mb-6">

                {p.description}

              </p>

              {/* FEATURES */}
              <div className="flex justify-center gap-4 mb-6 text-sm text-gray-600 flex-wrap">

                <div className="flex items-center gap-1">
                  <ShieldCheck size={16} className="text-green-500" />
                  Pure
                </div>

                <div className="flex items-center gap-1">
                  <Truck size={16} className="text-blue-500" />
                  Fast Delivery
                </div>

                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-500" />
                  Premium
                </div>

              </div>

              {/* PRICE */}
              <div className="mb-6">

                <span className="text-4xl font-extrabold text-blue-600">
                  ₹{p.price}
                </span>

              </div>

              {/* QUANTITY */}
              <div className="flex items-center justify-center gap-4 mb-8">

                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [p.id]: Math.max(1, prev[p.id] - 1),
                    }))
                  }
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 transition text-lg font-bold"
                >
                  -
                </button>

                <span className="text-lg font-bold w-8 text-center">
                  {quantities[p.id]}
                </span>

                <button
                  onClick={() =>
                    setQuantities((prev) => ({
                      ...prev,
                      [p.id]: prev[p.id] + 1,
                    }))
                  }
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 transition text-lg font-bold"
                >
                  +
                </button>

              </div>

              {/* BUTTONS */}
              <div className="flex gap-3">

                {/* ORDER BUTTON */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");

                    if (!token) {
                      navigate("/login");
                      return;
                    }

                    const profileCompleted =
                      localStorage.getItem("profileCompleted");

                    if (!profileCompleted) {
                      navigate("/profile");
                      return;
                    }

                    navigate(`/order/${p.id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                >

                  <ShoppingCart size={20} />

                  Order

                </button>

                {/* PAY BUTTON */}
                <button
                  onClick={() => {
                    const token = localStorage.getItem("token");

                    if (!token) {
                      navigate("/login");
                      return;
                    }

                    const profileCompleted =
                      localStorage.getItem("profileCompleted");

                    if (!profileCompleted) {
                      navigate("/profile");
                      return;
                    }

                    navigate(`/order/${p.id}`);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                >

                  <CreditCard size={20} />

                  Pay

                </button>

              </div>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default ProductSection;