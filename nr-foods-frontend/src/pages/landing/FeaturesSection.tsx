import {
  Droplet,
  Truck,
  HeartPulse,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <Droplet
        size={45}
        strokeWidth={1.5}
        className="text-blue-500 group-hover:text-white transition-colors duration-300"
      />
    ),

    title: "100% Pure Drinking Water",

    description:
      "Our purified mineral water goes through advanced RO + UV filtration to provide safe and healthy drinking water in Ahmedabad.",
  },

  {
    icon: (
      <Truck
        size={45}
        strokeWidth={1.5}
        className="text-blue-500 group-hover:text-white transition-colors duration-300"
      />
    ),

    title: "Fast Home Delivery",

    description:
      "Get quick 20L mineral water bottle delivery for homes, offices, and businesses with same-day service across Ahmedabad.",
  },

  {
    icon: (
      <HeartPulse
        size={45}
        strokeWidth={1.5}
        className="text-blue-500 group-hover:text-white transition-colors duration-300"
      />
    ),

    title: "Healthy Mineral Composition",

    description:
      "Rich in essential minerals and nutrients, our drinking water helps maintain your body's natural hydration and wellness.",
  },

  {
    icon: (
      <ShieldCheck
        size={45}
        strokeWidth={1.5}
        className="text-blue-500 group-hover:text-white transition-colors duration-300"
      />
    ),

    title: "Advanced 5-Step Filtration",

    description:
      "Our advanced purification process removes harmful impurities while preserving healthy minerals for pure drinking water.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-blue-50 to-white py-24">

      {/* BACKGROUND BLUR */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/30 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/30 blur-3xl rounded-full"></div>

      {/* TOP CONTENT */}
      <div className="relative z-10 text-center mb-20 px-6">

        {/* SMALL TAG */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm tracking-[0.3em] text-blue-500 font-bold uppercase mb-5"
        >
          OUR SERVICES
        </motion.p>

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight max-w-5xl mx-auto"
        >
          Best Mineral Water Delivery Service <br />

          <span className="text-blue-600 italic">
            in Ahmedabad
          </span>

        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mt-8 text-lg text-gray-600 leading-8"
        >
          We provide fast and affordable mineral water bottle delivery
          services for homes and offices with advanced purification,
          healthy mineral composition, and reliable doorstep delivery.
        </motion.p>

      </div>

      {/* FEATURE CARDS */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-10 max-w-7xl mx-auto">

        {features.map((item, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-white/90 backdrop-blur-xl p-10 rounded-3xl border border-blue-100 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
          >

            {/* HOVER BACKGROUND */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* CONTENT */}
            <div className="relative z-10">

              {/* ICON */}
              <div className="flex justify-center mb-8">

                <div className="p-5 rounded-2xl bg-blue-50 group-hover:bg-white/20 transition-all duration-500">

                  {item.icon}

                </div>

              </div>

              {/* TITLE */}
              <h3 className="text-blue-950 group-hover:text-white text-2xl font-bold mb-5 text-center transition-colors duration-300">

                {item.title}

              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-500 group-hover:text-blue-50 text-base leading-8 text-center transition-colors duration-300">

                {item.description}

              </p>

              {/* BUTTON */}
              <div className="mt-10 flex justify-center">

                <button className="px-7 py-3 rounded-full bg-blue-50 text-blue-600 font-semibold border border-blue-100 shadow-sm hover:scale-105 transition-all duration-300 group-hover:bg-white group-hover:text-blue-700">

                  Order Now →

                </button>

              </div>

            </div>

          </motion.article>
        ))}

      </div>

    </section>
  );
};

export default FeaturesSection;