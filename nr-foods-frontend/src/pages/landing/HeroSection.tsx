import {
  Phone,
  ShoppingCart,
  Star,
  Droplets,
  Truck,
} from "lucide-react";


import { motion } from "framer-motion";

const HeroSection = () => {
  
  return (
    <>
  

  
    <section
      className="relative min-h-[85vh] w-full overflow-hidden bg-cover bg-no-repeat flex items-center"
      style={{
        backgroundImage: "url('/images/slider-1.jpg')",
        backgroundPosition: "bottom",
      }}
    >
      {/* OVERLAY */}
     <div className="absolute inset-0 bg-black/5"></div>

      {/* BLUR EFFECTS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-2xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-2xl"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-10 pb-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >

            {/* TOP BADGE */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl shadow-xl px-6 py-4 rounded-full mb-8 border border-blue-100">

              <img
                src="https://cdn-icons-png.flaticon.com/512/3105/3105813.png"
                alt="KD Water Delivery Logo"
                className="w-8 h-8"
              />

              <span className="text-blue-700 font-bold text-sm tracking-wide uppercase">
                Fast RO Water Bottle Delivery Across Ahmedabad
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 leading-tight">

             20L Mineral Water <br />

              <span className="text-blue-600">
                Bottle Delivery
              </span>

              <br />

              in Ahmedabad

            </h1>

            {/* DESCRIPTION */}
            <p className="mt-8 text-lg text-blue-950 font-medium leading-9 max-w-xl">

              Get fast and reliable 20L mineral water bottle delivery in Ahmedabad including Nikol, Naroda, Vastral, Bapunagar, Odhav and nearby areas. Pure RO + UV purified drinking water for homes, offices and businesses.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap items-center gap-5 mt-8">

              {/* ORDER BUTTON */}
              <button className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full shadow-2xl font-semibold">

                <ShoppingCart size={20} />

                Order Water Now

              </button>

              {/* CALL BUTTON */}
              <button className="flex items-center gap-3 border-2 border-blue-600 text-blue-700 hover:bg-blue-50 bg-white/80 backdrop-blur-md transition px-8 py-4 rounded-full font-semibold">

                <Phone size={20} />

                Call Now

              </button>

            </div>

            {/* TRUST STATS */}
            <div className="inline-flex flex-wrap gap-10 mt-10 bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-xl inline-flex">

              <div>
                <h3 className="text-4xl font-extrabold text-blue-900">
                  1000+
                </h3>

                <p className="text-blue-950 font-semibold mt-1">
                  Ahmedabad Customers
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-extrabold text-blue-900">
                  Same
                </h3>

                <p className="text-blue-950 font-semibold mt-1">
                  Day Delivery
                </p>
              </div>

              <div>
                <h3 className="text-4xl font-extrabold text-blue-900">
                  RO + UV
                </h3>

                <p className="text-blue-950 font-semibold mt-1">
                  Purified Water
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="relative flex justify-center items-center"
          >

            {/* MAIN IMAGE */}
            <img
              src="/images/water-bottle.png"
              alt="20L mineral water bottle delivery service in Ahmedabad"
              className="w-[320px] md:w-[500px] object-contain drop-shadow-xl animate-float -ml-60 -mt-60"
            />
            

            {/* FLOATING CARD 1 */}
            <div className="hidden md:flex absolute -top-75 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl px-5 py-4 items-center gap-4 border border-blue-100">

              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="text-blue-600" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-blue-900">
                  Same Day Delivery
                </h4>

                <p className="text-sm text-gray-500">
                  Across Ahmedabad
                </p>
              </div>

            </div>

            {/* FLOATING CARD 2 */}
            <div className="hidden md:flex absolute bottom-10 -right-30  z-20 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl px-5 py-4 items-center gap-4 border border-blue-100">

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
                 <p className="text-sm text-gray-500">
                   Purified
                </p>
              </div>

            </div>

            {/* FLOATING CARD 3 */}
            <div className="hidden md:flex absolute top-30 left-0 z-20 bg-white/90 backdrop-blur-xl shadow-2xl rounded-2xl px-5 py-4 items-center gap-4 border border-blue-100">

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
            animation: float 6s ease-in-out infinite;
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
    </>
  );
};

export default HeroSection;