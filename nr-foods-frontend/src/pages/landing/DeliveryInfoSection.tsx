import { motion } from "framer-motion";


const DeliveryInfoSection = () => {
  return (
    <>
      {/* SEO META TAGS */}
     

      {/* SECTION */}
      <section
        className="w-full min-h-112 md:min-h-150 bg-no-repeat bg-cover bg-center flex items-center justify-center text-center px-4 sm:px-6 py-16 relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/banner-bg.jpg')",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl bg-white/35 backdrop-blur-md p-6 sm:p-8 md:p-12 rounded-4xl shadow-2xl border border-white/20"
        >
          {/* HEADING */}
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-blue-950 leading-tight mb-6">
           Same Day Mineral Water Delivery  <br />

            <span className="text-blue-600">
              Serving Ahmedabad Within 10 KM Radius.
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-700 text-base sm:text-lg leading-7 sm:leading-8 mb-8">
           We provide fast and reliable 20L mineral water bottle delivery services across Ahmedabad including Nikol, Naroda, Vastral, Odhav, Bapunagar and nearby areas.
          </p>
          <p className="text-sm text-blue-900 font-medium mt-4">
RO + UV purified drinking water for homes,
offices and businesses.
</p>
          {/* FEATURES */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-semibold text-sm border border-green-100 shadow-sm">
              <span>✔</span>
              Free Delivery
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-semibold text-sm border border-blue-100 shadow-sm">
              <span>✔</span>
              Same Day Service
            </div>
          </div>

        
        </motion.div>
      </section>
    </>
  );
};

export default DeliveryInfoSection;