import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  ShoppingCart,
  CreditCard,
  Star,
  Truck,
  Droplets,
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";

const ProductSection = () => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1,
    3: 1,
    4: 1,
  });

  const products = [
    {
      id: 1,
      name: "20L Cold Water Bottle",
      price: 30,
      image: "/shell/cold.png",
      tag: "Best Seller",
      description:
        "Fresh and purified 20L cold mineral water bottle for homes and offices in Ahmedabad.",
    },

    {
      id: 2,
      name: "20L Hot Water Bottle",
      price: 25,
      image: "/shell/hot.png",
      tag: "Popular",
      description:
        "Safe and healthy hot drinking water bottle with fast home delivery service.",
    },

    {
      id: 3,
      name: "Bisleri 200ml Water Bottle Box",
      price: 220,
      image: "/shell/bisleri.png",
      tag: "Hot",
      description:
        "Bisleri 200ml premium mineral water bottle box with 48 bottles for offices and events.",
    },

    {
      id: 4,
      name: "Yes 200ml Water Bottle Box",
      price: 170,
      image: "/shell/yes.png",
      tag: "Affordable",
      description:
        "Affordable Yes 200ml drinking water bottle box with pure and healthy mineral water.",
    },
  ];

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setQuantities((prev) => ({
      ...prev,

      [id]:
        type === "inc"
          ? prev[id] + 1
          : Math.max(1, prev[id] - 1),
    }));
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          Mineral Water Bottle Delivery in Ahmedabad | KD Water
        </title>

        <meta
          name="description"
          content="Buy 20L mineral water bottles and Bisleri water bottle boxes with fast home delivery in Ahmedabad. Pure drinking water for homes and offices."
        />

        <meta
          name="keywords"
          content="mineral water delivery Ahmedabad, 20L water bottle, Bisleri water bottle, drinking water supply, water delivery service"
        />
      </Helmet>

      <section className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white py-24 px-6">

        {/* BLUR EFFECT */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

        {/* TOP TEXT */}
        <div className="relative z-10 text-center max-w-4xl mx-auto mb-20">

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.3em] text-blue-500 font-bold uppercase mb-5"
          >
            OUR PRODUCTS
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight"
          >
            Premium Mineral Water <br />

            <span className="text-blue-600 italic">
              Delivery Service
            </span>

          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-8 text-lg text-gray-600 leading-8"
          >
            Order pure and healthy drinking water bottles online with
            fast doorstep delivery across Ahmedabad for homes,
            offices, events, and businesses.
          </motion.p>

        </div>

        {/* PRODUCTS */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">

          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/90 backdrop-blur-xl rounded-3xl border border-blue-100 overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >

              {/* TAG */}
              <div className="absolute top-5 left-5 z-20 bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">

                {p.tag}

              </div>

              {/* IMAGE */}
              <div className="relative overflow-hidden p-8">

                <img
                  src={p.image}
                  alt={p.name}
                  className="h-56 mx-auto object-contain group-hover:scale-110 transition-transform duration-500"
                />

              </div>

              {/* CONTENT */}
              <div className="px-8 pb-8">

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-blue-950 text-center mb-3 leading-snug">

                  {p.name}

                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-500 text-center leading-7 text-sm mb-6">

                  {p.description}

                </p>

                {/* FEATURES */}
                <div className="flex justify-center gap-5 mb-6 text-sm text-gray-600">

                  <div className="flex items-center gap-1">
                    <Droplets size={16} className="text-blue-500" />
                    Pure
                  </div>

                  <div className="flex items-center gap-1">
                    <Truck size={16} className="text-green-500" />
                    Fast Delivery
                  </div>

                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500" />
                    Premium
                  </div>

                </div>

                {/* PRICE */}
                <div className="text-center mb-6">

                  <span className="text-4xl font-extrabold text-blue-600">
                    ₹{p.price}
                  </span>

                </div>

                {/* QUANTITY */}
                <div className="flex items-center justify-center gap-4 mb-8">

                  <button
                    onClick={() => updateQuantity(p.id, "dec")}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 transition font-bold text-lg"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold w-8 text-center">
                    {quantities[p.id]}
                  </span>

                  <button
                    onClick={() => updateQuantity(p.id, "inc")}
                    className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 transition font-bold text-lg"
                  >
                    +
                  </button>

                </div>

                {/* BUTTONS */}
                <div className="flex gap-3">

                  {/* ORDER */}
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");

                      if (!token) {
                        navigate("/login");

                        return;
                      }

                      navigate("/profile");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                  >

                    <ShoppingCart size={20} />

                    Order

                  </button>

                  {/* PAY */}
                  <button
                    onClick={() => {
                      const token = localStorage.getItem("token");

                      if (!token) {
                        navigate("/login");

                        return;
                      }

                      navigate("/profile");
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
                  >

                    <CreditCard size={20} />

                    Pay

                  </button>

                </div>

              </div>

            </motion.article>
          ))}

        </div>

      </section>
    </>
  );
};

export default ProductSection;