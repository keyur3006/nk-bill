import { motion } from "framer-motion";

const DeliveryInfoSection = () => {
  return (
    <section
      className="w-full min-h-[400px] md:h-125 bg-no-repeat bg-cover bg-center flex items-center justify-center text-center px-6"
      style={{
        backgroundImage: "url('/images/banner-bg.jpg')",
      }}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="max-w-xl bg-white/10 p-8 md:p-12 rounded-4xl "
      >
        <h1 className="text-3xl md:text-5xl font-bold text-blue-950 mb-6">
          Fast Delivery <br />
          <span className="text-blue-600">Within 20 KM.</span>
        </h1>

        <p className="text-gray-700 mb-8 text-lg leading-relaxed">
          We provide quick and reliable water delivery services across a 20km radius to ensure you never run out of pure hydration.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full font-bold text-sm border border-green-100">
            <span>✔</span> Free Delivery
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm border border-blue-100">
            <span>✔</span> 7 Days a Week
          </div>
        </div>

        <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
          Learn More →
        </button>
      </motion.div>
    </section>
  );
};

export default DeliveryInfoSection;
