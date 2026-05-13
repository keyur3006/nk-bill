import { Phone, ShoppingCart, Star, Droplets, Truck } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/images/slider-1.jpg')",
      }}
    >
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/75 backdrop-blur-[2px]"></div>

      {/* WATER BLUR EFFECT */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* TOP BADGE */}
            <div className="inline-flex items-center gap-3 bg-white shadow-lg px-5 py-3 rounded-full mb-8 border border-blue-100">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3105/3105813.png"
                alt="KD Water Delivery Logo"
                className="w-8 h-8"
              />

              <span className="text-blue-700 font-semibold text-sm tracking-wide uppercase">
                Best Mineral Water Supplier in Ahmedabad
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-blue-950 leading-tight">

              Fresh & Pure <br />

              <span className="text-blue-600">
                Mineral Water
              </span>

              <br />

              Delivery Service

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-lg text-gray-700 leading-8 max-w-xl">

              Get fast and reliable 20L mineral water bottle delivery at your
              home and office in Ahmedabad. We provide safe, healthy and
              purified drinking water with affordable pricing and same-day
              delivery service.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-5 mt-10">

              {/* ORDER BUTTON */}
              <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full shadow-2xl font-semibold">

                <ShoppingCart size={20} />

                Order Water Now

              </button>

              {/* CALL BUTTON */}
              <button className="flex items-center gap-3 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 transition px-8 py-4 rounded-full font-semibold">

                <Phone size={20} />

                Call For Delivery

              </button>

            </div>

            {/* TRUST STATS */}
            <div className="flex flex-wrap gap-10 mt-14">

              <div>
                <h3 className="text-3xl font-bold text-blue-900">
                  500+
                </h3>

                <p className="text-gray-600 mt-1">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-900">
                  24/7
                </h3>

                <p className="text-gray-600 mt-1">
                  Fast Delivery
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-blue-900">
                  100%
                </h3>

                <p className="text-gray-600 mt-1">
                  Pure Drinking Water
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center"
          >

            {/* MAIN IMAGE */}
            <img
              src="/images/water-bottle.png"
              alt="20L Mineral Water Bottle Delivery"
              className="w-full max-w-xl drop-shadow-[0_25px_60px_rgba(0,0,0,0.25)] animate-float"
            />

            {/* FLOATING CARD 1 */}
            <div className="absolute top-10 left-0 bg-white shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-blue-100">

              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="text-blue-600" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-blue-900">
                  Fast Delivery
                </h4>

                <p className="text-sm text-gray-500">
                  Within 30 Minutes
                </p>
              </div>

            </div>

            {/* FLOATING CARD 2 */}
            <div className="absolute bottom-10 right-0 bg-white shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-blue-100">

              <div className="bg-cyan-100 p-3 rounded-full">
                <Droplets className="text-cyan-600" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-blue-900">
                  100% Pure Water
                </h4>

                <p className="text-sm text-gray-500">
                  RO + UV Purified
                </p>
              </div>

            </div>

            {/* FLOATING CARD 3 */}
            <div className="absolute bottom-52 left-10 bg-white shadow-2xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-blue-100">

              <div className="bg-yellow-100 p-3 rounded-full">
                <Star className="text-yellow-500" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-blue-900">
                  4.9 Rating
                </h4>

                <p className="text-sm text-gray-500">
                  Trusted by Customers
                </p>
              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* FLOAT ANIMATION */}
      <style>
        {`
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-15px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        `}
      </style>

    </section>
  );
};

export default HeroSection;